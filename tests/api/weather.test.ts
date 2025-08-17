import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCurrentWeather, getDailyWeather, getWeatherForDate } from "../../src/api/weather";

// Helper to mock global fetch
function mockFetchOnce(data: unknown) {
    const g = globalThis as unknown as {
        fetch: (input?: unknown, init?: unknown) => Promise<{ json: () => Promise<unknown> }>;
    };
    g.fetch = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue(data),
    });
}

describe("api/weather", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("getCurrentWeather maps API to WeatherData", async () => {
        mockFetchOnce({
            current: {
                temperature_2m: 12.3,
                relative_humidity_2m: 66,
                apparent_temperature: 10.1,
                weather_code: 0,
                wind_speed_10m: 5.555,
            },
        });

        // mock time helpers
        vi.mock("../../src/utils/time.ts", async (orig) => {
            const mod = await orig();
            return {
                ...(mod ?? {}),
                getDate: () => "2025-01-10",
                getDayName: () => "Friday",
            };
        });

        const res = await getCurrentWeather({ latitude: 0, longitude: 0, city: "City" });
        expect(res).toMatchObject({
            city: "City",
            temperature: 12.3,
            feelsLike: 10.1,
            condition: "Clear sky",
            icon: "sunny",
            humidity: 66,
            windSpeed: 5.555,
            date: "2025-01-10",
            dayName: "Friday",
        });
    });

    it("getDailyWeather returns array of DailyWeather", async () => {
        mockFetchOnce({
            daily: {
                time: ["2025-01-09", "2025-01-10", "2025-01-11"],
                weather_code: [2, 0, 63],
                temperature_2m_max: [15.2, 16.8, 17.9],
                temperature_2m_min: [6.1, 7.3, 9.2],
            },
        });

        vi.mock("../../src/utils/time.ts", async (orig) => {
            const mod = await orig();
            return {
                ...(mod ?? {}),
                getDate: (n: number) => n === 0 ? "2025-01-10" : "2025-01-10",
                getDayName: (d: string) => ({
                    "2025-01-09": "Thursday",
                    "2025-01-10": "Friday",
                    "2025-01-11": "Saturday",
                }[d] || "X"),
            };
        });

        const list = await getDailyWeather({ latitude: 0, longitude: 0, city: "City" });
        expect(list).toHaveLength(3);
        expect(list[1]).toMatchObject({
            date: "2025-01-10",
            dayName: "Friday",
            temperatureMax: 16.8,
            temperatureMin: 7.3,
            condition: "Clear sky",
            icon: "sunny",
            isToday: true,
        });
    });

    it("getWeatherForDate returns noon hourly snapshot for the date", async () => {
        const hourly = {
            weather_code: Array.from({ length: 24 }, (_, i) => (i === 12 ? 63 : 0)),
            temperature_2m: Array.from({ length: 24 }, (_, i) => i),
            apparent_temperature: Array.from({ length: 24 }, (_, i) => i + 0.5),
            relative_humidity_2m: Array.from({ length: 24 }, () => 50),
            wind_speed_10m: Array.from({ length: 24 }, (_, i) => i * 0.5),
        };
        mockFetchOnce({ hourly });

        const res = await getWeatherForDate({ latitude: 0, longitude: 0, city: "City" }, "2025-01-11");
        expect(res).toMatchObject({
            city: "City",
            temperature: 12,
            feelsLike: 12.5,
            condition: "Moderate rain",
            icon: "rainy",
            humidity: 50,
            windSpeed: 6,
        });
    });
});
