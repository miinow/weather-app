import { useEffect, useState } from "react";
import "./App.css";
import MainWeatherCard from "./components/MainWeatherCard.tsx";
import WeeklyForecast from "./components/WeeklyForecast.tsx";
import type { DailyForecast, WeatherData, Location } from "./types";
import { getCurrentWeather } from "./api/request.ts";
import { defaultLocation } from "./utils/location.ts";

function App() {
    const [loading, setLoading] = useState(false);
    const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([]);
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setDailyForecasts([]);

        setLocation(defaultLocation);
    }, []);

    useEffect(() => {
        if (!location) {
            return;
        }

        fetchWeatherData();

        // fetch weather data every hour
        const interval = setInterval(fetchWeatherData, 1000 * 60 * 60);

        return () => clearInterval(interval);
    }, [location]);

    const fetchWeatherData = async () => {
        try {
            setLoading(true);
            const weather = await getCurrentWeather(location!);
            setCurrentWeather(weather);
            setLoading(false);
            setError(null);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to fetch weather data");
        }
    };

    return (
        <div>
            {error && <div className="text-red-500">{error}</div>}
            <MainWeatherCard weatherData={currentWeather} loading={loading} />
            <WeeklyForecast forecasts={dailyForecasts} loading={loading} />
        </div>
    );
}

export default App;
