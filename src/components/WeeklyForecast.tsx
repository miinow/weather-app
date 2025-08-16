import type { DailyForecast } from "../types";
import DailyForecastItem from "./DailyForecastItem.tsx";
import * as React from "react";

const WeeklyForecast: React.FC<{ forecasts: DailyForecast[]; loading: boolean }> = ({ forecasts, loading }) => {
    return (
        <div>
            {!loading && forecasts.map((forecast, i) => (
                <DailyForecastItem forecast={forecast} key={i} />
            ))}
        </div>
    );

};

export default WeeklyForecast;