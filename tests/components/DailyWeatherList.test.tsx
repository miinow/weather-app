import { describe, it, expect, vi } from "vitest";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DailyWeatherList from "../../src/components/DailyWeatherList";
import type { DailyWeather } from "../../src/types";

function makeDay(overrides: Partial<DailyWeather> = {}): DailyWeather {
    return {
        date: "2025-01-10",
        dayName: "Friday",
        temperatureMax: 23.4,
        temperatureMin: 11.2,
        condition: "Clear sky",
        icon: "sunny",
        isToday: false,
        ...overrides,
    };
}

describe("DailyWeatherList", () => {

    it("renders list of items", () => {
        const data = [
            makeDay({ date: "2025-01-10", dayName: "Friday" }),
            makeDay({ date: "2025-01-11", dayName: "Saturday" }),
            makeDay({ date: "2025-01-12", dayName: "Sunday" }),
        ];
        render(<DailyWeatherList weatherData={data} loading={false} />);

        for (const d of data) {
            expect(screen.getByText(d.dayName)).toBeInTheDocument();
            expect(screen.getByText(d.date)).toBeInTheDocument();
        }
    });

    it("calls onSelect with the day when an item is clicked", async () => {
        const user = userEvent.setup();
        const data = [
            makeDay({ date: "2025-01-10", dayName: "Friday" }),
            makeDay({ date: "2025-01-11", dayName: "Saturday" }),
        ];
        const onSelect = vi.fn();
        render(<DailyWeatherList weatherData={data} loading={false} onSelect={onSelect} />);

        await user.click(screen.getByText("Saturday"));
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ date: "2025-01-11" }));
    });
});
