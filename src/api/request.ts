import type { WeatherData } from "../types";
import { getWeatherCondition } from "../utils/weather.tsx";

const baseUrl = "https://api.open-meteo.com/v1/forecast";

interface Location {
    latitude: number;
    longitude: number;
    city: string;
}

const CURRENT_PARAMS = "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m";

export async function getCurrentWeather(location: Location): Promise<WeatherData> {
    const url = `${baseUrl}?latitude=${location.latitude}&longitude=${location.longitude}&current=${CURRENT_PARAMS}&timezone=auto`;

    const response = await fetch(url);
    const data = await response.json();

    const weatherInfo = getWeatherCondition(data.current.weather_code);

    return {
        city: location.city,
        temperature: data.current.temperature_2m,
        feelsLike: data.current.apparent_temperature,
        condition: weatherInfo.condition,
        icon: weatherInfo.icon,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
    };
}
