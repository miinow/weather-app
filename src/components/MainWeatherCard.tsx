import * as React from "react";
import type { WeatherData } from "../types";
import Loading from "./Loading.tsx";
import { useEffect } from "react";

const MainWeatherCard: React.FC<{ weatherData: WeatherData | null; loading: boolean }> = ({ weatherData, loading }) => {

    useEffect(() => {
        console.log(weatherData);
    }, [weatherData]);

    return (
        <div className="bg-black">
            {loading && <Loading />}
        </div>

    );
};

export default MainWeatherCard;