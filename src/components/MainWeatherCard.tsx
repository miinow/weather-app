import * as React from "react";
import type { Location, WeatherData } from "../types";
import Loading from "./Loading.tsx";
import { Droplets, Wind } from "lucide-react";
import WeatherIcon from "./WeatherIcon.tsx";
import LocationSearchBar from "./LocationSearchBar.tsx";

interface Props {
    weatherData: WeatherData | null;
    loading: boolean;
    setLocation: (location: Location) => void;
}

const MainWeatherCard: React.FC<Props> = ({ weatherData, loading, setLocation }) => {
    if (loading) {
        return <Loading />;
    }
    if (!weatherData) {
        return <div>Unable to load weather data</div>;
    }

    return (
        <div className="bg-white shadow-2xl flex-1 flex flex-col justify-center items-center p-8 min-h-[28rem]">
            <h1 className="text-center text-gray-700 text-xl font-medium mb-2 leading-tight">
                {weatherData.city}
            </h1>
            <LocationSearchBar onSelect={setLocation} />
            <div className="mb-4 mt-4 text-center">
                <div className="text-sm text-blue-700 font-medium">{weatherData.dayName}</div>
                <div className="text-xs text-gray-500">{weatherData.date}</div>
            </div>
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