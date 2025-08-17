import { useEffect, useState, useCallback } from "react";
import "./App.css";
import MainWeatherCard from "./components/MainWeatherCard.tsx";
import DailyWeatherList from "./components/DailyWeatherList.tsx";
import type { WeatherData, Location, DailyWeather } from "./types";
import { getCurrentWeather, getDailyWeather, getWeatherForDate } from "./api/weather.ts";
import { defaultLocation } from "./utils/location.ts";

function App() {
    const [loading, setLoading] = useState(false);
    const [dailyWeather, setDailyWeather] = useState<DailyWeather[]>([]);
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedDaily, setSelectedDaily] = useState<DailyWeather | null>(null);
    const [selectedDetail, setSelectedDetail] = useState<WeatherData | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        setDailyWeather([]);

        setLocation(defaultLocation);
    }, []);

    useEffect(() => {
        if (!location) {
            return;
        }

        setSelectedDaily(null);
        setSelectedDetail(null);

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

    const handleSelectDay = useCallback(async (day: DailyWeather) => {
        if (!location) {
            return;
        }
        try {
            setDetailLoading(true);
            setSelectedDaily(day);
            const detail = await getWeatherForDate(location, day.date);
            setSelectedDetail(detail);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch selected day weather");
        } finally {
            setDetailLoading(false);
        }
    }, [location]);


    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
            {error && <div className="text-red-500">{error}</div>}
            <MainWeatherCard
                weatherData={selectedDetail ?? currentWeather}
                loading={loading || detailLoading}
                setLocation={setLocation}
            />
            <DailyWeatherList
                weatherData={dailyWeather}
                loading={loading}
                onSelect={handleSelectDay}
                selectedDate={selectedDaily?.date ?? null}
            />
        </div>
    );
}

export default App;
