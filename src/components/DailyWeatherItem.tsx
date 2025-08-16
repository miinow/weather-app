import type { DailyWeather } from "../types";
import WeatherIcon from "./WeatherIcon.tsx";

interface Props {
    weatherData: DailyWeather;
    onClick?: (day: DailyWeather) => void;
    selected?: boolean;
}

const DailyWeatherItem: React.FC<Props> = ({ weatherData, onClick, selected = false }) => {
    const selectedStyles = selected ? "ring-2 ring-blue-500 bg-blue-50" : "";
    return (
        <div
            onClick={onClick ? () => onClick(weatherData) : undefined}
            onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(weatherData); } : undefined}
            className={`cursor-pointer flex-shrink-0 bg-white rounded-2xl p-4 shadow-sm transition-all hover:shadow-sm hover:scale-105 ${weatherData.isToday ? "ring-2 ring-blue-400 bg-blue-50" : ""} ${selectedStyles}`}
            style={{ minWidth: "140px" }}
        >
            <div className="text-center">
                <div className={`font-semibold text-sm mb-1 ${weatherData.isToday ? "text-blue-600" : "text-gray-700"}`}>
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