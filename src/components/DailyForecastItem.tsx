import type { DailyForecast } from "../types";
import { useEffect } from "react";

const DailyForecastItem: React.FC<{ forecast: DailyForecast }> = ({ forecast }) => {

    useEffect(() => {
        console.log(forecast);
    }, []);

    return (
        <div>Daily Forecast Item</div>
    );
};

export default DailyForecastItem;