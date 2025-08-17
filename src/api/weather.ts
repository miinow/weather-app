import type { WeatherData, DailyWeather, Location } from "../types";
import { getWeatherCondition } from "../utils/weather.tsx";
import { getDate, getDayName } from "../utils/time.ts";

const baseUrl = "https://api.open-meteo.com/v1/forecast";

const CURRENT_PARAMS = "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m";
const DAILY_PARAMS = "weather_code,temperature_2m_max,temperature_2m_min";

export async function getCurrentWeather(location: Location): Promise<WeatherData> {
    const url = `${baseUrl}?latitude=${location.latitude}&longitude=${location.longitude}&current=${CURRENT_PARAMS}&timezone=auto`;

    const response = await fetch(url);
    const data = await response.json();

    const weatherInfo = getWeatherCondition(data.current.weather_code);
    const today = getDate(0);
    return {
        city: location.city,
        temperature: data.current.temperature_2m,
        feelsLike: data.current.apparent_temperature,
        condition: weatherInfo.condition,
        icon: weatherInfo.icon,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        date: today,
        dayName: getDayName(today),

    };
}

export async function getDailyWeather(location: Location): Promise<DailyWeather[]> {
    const startDate = getDate(-3);
    const endDate = getDate(3);

    const url = `${baseUrl}?latitude=${location.latitude}&longitude=${location.longitude}&start_date=${startDate}&end_date=${endDate}&daily=${DAILY_PARAMS}&timezone=auto`;

    const response = await fetch(url);
    const data = await response.json();

    const today = getDate(0);
    const { daily } = data;

    return daily.time.map((date: string, i: number) => {
        const weatherInfo = getWeatherCondition(daily.weather_code[i]);

        return {
            date,
            dayName: getDayName(date),
            temperatureMax: daily.temperature_2m_max[i],
            temperatureMin: daily.temperature_2m_min[i],
            condition: weatherInfo.condition,
            icon: weatherInfo.icon,
            isToday: today === date,
        } as DailyWeather;
    });
}


// because the daily forecast API doesn't include the details data like wind speed, humidity, etc.
// we need to make a separate request for each day to get the details data
// this is a bit inefficient but it works for now
export async function getWeatherForDate(location: Location, date: string): Promise<WeatherData> {
    const url = `${baseUrl}?latitude=${location.latitude}&longitude=${location.longitude}&start_date=${date}&end_date=${date}&hourly=${CURRENT_PARAMS}&timezone=auto`;

    const response = await fetch(url);
    const data = await response.json();

    // the index of the noon time of the day
    const idx = 12;

    const weatherInfo = getWeatherCondition(data.hourly.weather_code[idx]);

    return {
        date,
        dayName: getDayName(date),
        city: location.city,
        temperature: data.hourly.temperature_2m[idx],
        feelsLike: data.hourly.apparent_temperature[idx],
        condition: weatherInfo.condition,
        icon: weatherInfo.icon,
        humidity: data.hourly.relative_humidity_2m[idx],
        windSpeed: data.hourly.wind_speed_10m[idx],
    } as WeatherData;
}