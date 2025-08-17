import { describe, it, expect } from "vitest";
import { getWeatherCondition, iconMap } from "../../src/utils/weather";
import * as React from "react";

describe("utils/weather - getWeatherCondition", () => {
    it("returns mapped condition and icon for known codes", () => {
        expect(getWeatherCondition(0)).toEqual({ condition: "Clear sky", icon: "sunny" });
        expect(getWeatherCondition(2)).toEqual({ condition: "Partly cloudy", icon: "partly-cloudy" });
        expect(getWeatherCondition(63)).toEqual({ condition: "Moderate rain", icon: "rainy" });
        expect(getWeatherCondition(75)).toEqual({ condition: "Heavy snow", icon: "snow" });
        expect(getWeatherCondition(95)).toEqual({ condition: "Thunderstorm", icon: "storm" });
    });

    it("returns default for unknown codes", () => {
        expect(getWeatherCondition(999)).toEqual({ condition: "Unknown", icon: "cloudy" });
    });
});

describe("utils/weather - iconMap", () => {
    it("returns a React element factory for each known icon", () => {
        const icons = ["sunny", "partly-cloudy", "cloudy", "rainy", "drizzle", "snow", "storm", "windy"] as const;
        for (const key of icons) {
            const el = iconMap[key](24);
            expect(React.isValidElement(el)).toBe(true);
        }
    });
});
