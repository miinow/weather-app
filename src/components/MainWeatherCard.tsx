import * as React from "react";
import type { WeatherData } from "../types";
import Loading from "./Loading.tsx";
import { useEffect } from "react";
import { Droplets, Wind } from "lucide-react";
import WeatherIcon from "./WeatherIcon.tsx";

const MainWeatherCard: React.FC<{ weatherData: WeatherData | null; loading: boolean }> = ({ weatherData, loading }) => {

    useEffect(() => {
        console.log(weatherData);
    }, [weatherData]);

    if (loading) {
        return <Loading />;
    }
    if (!weatherData) {
        return (
            <div>Unable to load weather data</div>
        );
    }

    return (
        <div className="bg-white shadow-2xl flex-1 flex flex-col justify-center items-center p-8">
            <h1 className="text-center text-gray-700 text-xl font-medium mb-12 leading-tight">
                {weatherData.city}
            </h1>

            <div className="flex justify-center mb-12">
                <div className="relative w-40 h-40 flex items-center justify-center">
                    <WeatherIcon icon={weatherData.icon} size={160} />
                </div>
            </div>

            <div className="text-center">
                <div className="text-7xl font-light text-gray-800 mb-3">
                    {weatherData.temperature.toFixed(1)}°
                </div>
                <div className="text-gray-500 text-xl mb-2">
                    {weatherData.condition}
                </div>
                <div className="text-gray-400 text-lg mb-4">
                    Feels like {weatherData.feelsLike.toFixed(1)}°
                </div>
                <div className="flex justify-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Droplets size={16} className="text-blue-400" />
                        <span>{weatherData.humidity}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Wind size={16} className="text-gray-400" />
                        <span>{weatherData.windSpeed.toFixed(1)} km/h</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainWeatherCard;