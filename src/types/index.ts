export interface WeatherData {
    city: string;
    temperature: number;
    feelsLike: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
}

export interface DailyWeather {
    date: Date;
    dayName: string;
    temperatureMax: number;
    temperatureMin: number;
    condition: string;
    icon: string;
    isToday: boolean;
}

export interface Location {
    latitude: number;
    longitude: number;
    city: string;
}

export interface LocationResponse {
    latitude: number;
    longitude: number;
    name: string;
    admin1?: string;
    country?: string;
}