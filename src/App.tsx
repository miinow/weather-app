import { useEffect, useState } from "react";
import "./App.css";
import MainWeatherCard from "./components/MainWeatherCard.tsx";
import DailyWeatherList from "./components/DailyWeatherList.tsx";
import type { WeatherData, Location, DailyWeather } from "./types";
import { getCurrentWeather, getDailyWeather } from "./api/weather.ts";
import { defaultLocation } from "./utils/location.ts";

function App() {
    const [loading, setLoading] = useState(false);
    const [dailyWeather, setDailyWeather] = useState<DailyWeather[]>([]);
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setDailyWeather([]);

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
            const [currentWeather, dailyWeather] = await Promise.all([
                getCurrentWeather(location!),
                getDailyWeather(location!),
            ]);

            setCurrentWeather(currentWeather);
            setDailyWeather(dailyWeather);

            setLoading(false);
            setError(null);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to fetch weather data");
        }
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
            {error && <div className="text-red-500">{error}</div>}
            <MainWeatherCard weatherData={currentWeather} loading={loading} setLocation={setLocation} />
            <DailyWeatherList weatherData={dailyWeather} loading={loading} />
        </div>
    );
}

export default App;
