import type { DailyWeather } from "../types";
import DailyWeatherItem from "./DailyWeatherItem.tsx";
import * as React from "react";

const DailyWeatherList: React.FC<{ weatherData: DailyWeather[]; loading: boolean }> = ({ weatherData, loading }) => {
    if (loading) {
        return (
            <div className="bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {[...Array(7)].map((_, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-lg animate-pulse"
                                style={{ minWidth: "140px" }}
                            >
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                                    <div className="h-10 w-10 bg-gray-200 rounded-full mx-auto"></div>
                                    <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-6">
            <div className="mx-auto flex gap-3 justify-center overflow-x-auto pb-2 pt-2 mb-4">
                {weatherData.map((weather, index) => (
                    <DailyWeatherItem key={index} weatherData={weather} />
                ))}
            </div>
        </div>
    );
};

export default DailyWeatherList;