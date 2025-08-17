import { describe, it, expect, vi } from "vitest";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DailyWeatherItem from "../../src/components/DailyWeatherItem";
import type { DailyWeather } from "../../src/types";

const baseDay: DailyWeather = {
    date: "2025-01-11",
    dayName: "Sat",
    temperatureMax: 30.7,
    temperatureMin: 20.1,
    condition: "Clear sky",
    icon: "sunny",
    isToday: false,
};

describe("DailyWeatherItem", () => {
    it("renders day info and temperatures", () => {
        render(<DailyWeatherItem weatherData={baseDay} />);
        expect(screen.getByText("Sat")).toBeInTheDocument();
        expect(screen.getByText("2025-01-11")).toBeInTheDocument();
        expect(screen.getByText("31°")).toBeInTheDocument(); // 30.7 -> 31
        expect(screen.getByText("20°")).toBeInTheDocument(); // 20.1 -> 20
    });

    it("calls onClick with weatherData when clicked", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<DailyWeatherItem weatherData={baseDay} onClick={onClick} />);

        await user.click(screen.getByText("Sat"));
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ date: "2025-01-11" }));
    });
});
