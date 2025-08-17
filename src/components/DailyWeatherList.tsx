import * as React from "react";
import type { DailyWeather } from "../types";
import DailyWeatherItem from "./DailyWeatherItem.tsx";
import Skeleton from "./Skeleton.tsx";

interface Props {
    weatherData: DailyWeather[];
    loading: boolean;
    onSelect?: (day: DailyWeather) => void;
    selectedDate?: DailyWeather["date"] | null;
}

const DailyWeatherList: React.FC<Props> = ({ weatherData, loading, onSelect, selectedDate = null }) => {
    return (
        <div className="bg-gray-50 p-6">
            {
                loading ? (
                    <div className="max-w-s mx-auto">
                        <div className="flex justify-center gap-3 overflow-x-auto pb-2">
                            {[...Array(7)].map((_, index) => (
                                <Skeleton key={index} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div
                        className="mx-auto flex gap-3 xl:justify-center justify-start overflow-x-scroll pb-2 pt-2 mb-4">
                        {weatherData.map((weather, index) => (
                            <DailyWeatherItem
                                key={index}
                                weatherData={weather}
                                onClick={onSelect}
                                selected={!!selectedDate && weather.date === selectedDate}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default DailyWeatherList;