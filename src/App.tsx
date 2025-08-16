import { useEffect, useState } from "react";
import "./App.css";
import MainWeatherCard from "./components/MainWeatherCard.tsx";
import WeeklyForecast from "./components/WeeklyForecast.tsx";
import type { DailyForecast, WeatherData } from "./types";

function App() {
    const [loading, setLoading] = useState(true);
    const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([]);
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);


    useEffect(() => {
        setDailyForecasts([]);
        setLoading(false);
        setCurrentWeather({
            city: "Wellington, New Zealand",
            temperature: 12.6,
            feelsLike: 10.3,
            condition: "Cloudy",
            icon: "cloudy",
            humidity: 75,
            windSpeed: 15.5,
        });
    }, []);

    return (
        <>
            <div>
                <MainWeatherCard weatherData={currentWeather} loading={loading} />
                <WeeklyForecast forecasts={dailyForecasts} loading={loading} />
            </div>
        </>
    );
}

export default App;
