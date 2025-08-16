import type { DailyWeather } from "../types";
import WeatherIcon from "./WeatherIcon.tsx";

const DailyWeatherItem: React.FC<{ weatherData: DailyWeather }> = ({ weatherData }) => {

    return (
        <div
            className={`flex-shrink-0 bg-white rounded-2xl p-4 shadow-sm transition-all hover:shadow-sm hover:scale-105 ${weatherData.isToday && "ring-2 ring-blue-400 bg-blue-50"}`}
            style={{ minWidth: "140px" }}
        >
            <div className="text-center">
                <div
                    className={`font-semibold text-sm mb-1 ${weatherData.isToday ? "text-blue-600" : "text-gray-700"}`}>
                    {weatherData.dayName}
                </div>
                <div className="text-xs text-gray-500 mb-3">
                    {weatherData.date}
                </div>

                <div className="flex justify-center mb-3">
                    <WeatherIcon icon={weatherData.icon} size={40} />
                </div>

                <div className="text-2xl font-semibold text-gray-800">
                    {weatherData.temperatureMax.toFixed(0)}°
                </div>
                <div className="text-sm text-gray-500 mt-1">
                    {weatherData.temperatureMin.toFixed(0)}°
                </div>
            </div>
        </div>
    );
};

export default DailyWeatherItem;