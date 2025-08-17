import { describe, it, expect, vi, beforeEach } from "vitest";
import { getLocations } from "../../src/api/location";

function mockFetchOnce(data: unknown) {
    const g = globalThis as unknown as {
        fetch: (input?: unknown, init?: unknown) => Promise<{ json: () => Promise<unknown> }>;
    };
    g.fetch = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue(data),
    });
}

describe("api/location - getLocations", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("maps API results to Location[] with combined city string", async () => {
        mockFetchOnce({
            results: [
                {
                    latitude: 1.23,
                    longitude: 4.56,
                    name: "Wellington",
                    admin1: "Wellington Region",
                    country: "New Zealand",
                },
                { latitude: 7.89, longitude: 0.12, name: "Paris", country: "France" },
            ],
        });

        const list = await getLocations("well");
        expect(list).toEqual([
            { latitude: 1.23, longitude: 4.56, city: "Wellington, Wellington Region, New Zealand" },
            { latitude: 7.89, longitude: 0.12, city: "Paris, France" },
        ]);
    });
});
