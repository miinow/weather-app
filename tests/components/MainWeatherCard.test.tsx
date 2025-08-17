import { describe, it, expect } from "vitest";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import MainWeatherCard from "../../src/components/MainWeatherCard";
import type { WeatherData } from "../../src/types";

const baseWeather: WeatherData = {
    city: "City",
    temperature: 21.4,
    feelsLike: 20.7,
    condition: "Clear sky",
    icon: "sunny",
    humidity: 55,
    windSpeed: 4.2,
    date: "2025-01-10",
    dayName: "Friday",
};

const selectedDetail: WeatherData = {
    city: "City",
    temperature: 18.9,
    feelsLike: 18.3,
    condition: "Moderate rain",
    icon: "rainy",
    humidity: 70,
    windSpeed: 6,
    date: "2025-01-11",
    dayName: "Saturday",
};

const noopSetLocation = () => {};

describe("MainWeatherCard", () => {
    it("renders current weather when no selection", () => {
        render(
            <MainWeatherCard
                weatherData={baseWeather}
                loading={false}
                setLocation={noopSetLocation}
            />,
        );

        expect(screen.getByText("City")).toBeInTheDocument();
        expect(screen.getByText("Friday")).toBeInTheDocument();
        expect(screen.getByText("2025-01-10")).toBeInTheDocument();
        expect(screen.getByText("21.4°")).toBeInTheDocument();
        expect(screen.getByText("Feels like 20.7°")).toBeInTheDocument();
        expect(screen.getByText("Clear sky")).toBeInTheDocument();
        expect(screen.getByText("55%")).toBeInTheDocument();
        expect(screen.getByText("4.2 km/h")).toBeInTheDocument();
    });

    it("renders selected day details when provided directly as weatherData", () => {
        render(
            <MainWeatherCard
                weatherData={selectedDetail}
                loading={false}
                setLocation={noopSetLocation}
            />,
        );

        // shows selected detail values instead of base
        expect(screen.getByText("18.9°")).toBeInTheDocument();
        expect(screen.getByText("Feels like 18.3°")).toBeInTheDocument();
        expect(screen.getByText("Moderate rain")).toBeInTheDocument();
        expect(screen.getByText("70%")).toBeInTheDocument();
        expect(screen.getByText("6.0 km/h")).toBeInTheDocument();
    });
});
