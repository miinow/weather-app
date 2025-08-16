import { Cloud, CloudRain, CloudSnow, Sun, CloudDrizzle, Wind, CloudLightning } from "lucide-react";
import type { JSX } from "react";

const weatherMap: { [key: string]: { condition: string; icon: string } } = {
    "0": { condition: "Clear sky", icon: "sunny" },
    "1": { condition: "Mainly clear", icon: "sunny" },
    "2": { condition: "Partly cloudy", icon: "partly-cloudy" },
    "3": { condition: "Overcast", icon: "cloudy" },

    // fog
    "45": { condition: "Foggy", icon: "cloudy" },
    "48": { condition: "Depositing rime fog", icon: "cloudy" },

    // drizzle
    "51": { condition: "Light drizzle", icon: "drizzle" },
    "53": { condition: "Moderate drizzle", icon: "drizzle" },
    "55": { condition: "Dense drizzle", icon: "drizzle" },
    "56": { condition: "Light freezing drizzle", icon: "drizzle" },
    "57": { condition: "Dense freezing drizzle", icon: "drizzle" },

    // rain
    "61": { condition: "Slight rain", icon: "rainy" },
    "63": { condition: "Moderate rain", icon: "rainy" },
    "65": { condition: "Heavy rain", icon: "rainy" },
    "66": { condition: "Light freezing rain", icon: "rainy" },
    "67": { condition: "Heavy freezing rain", icon: "rainy" },

    // snow
    "71": { condition: "Slight snow", icon: "snow" },
    "73": { condition: "Moderate snow", icon: "snow" },
    "75": { condition: "Heavy snow", icon: "snow" },
    "77": { condition: "Snow grains", icon: "snow" },

    // showers
    "80": { condition: "Slight rain showers", icon: "rainy" },
    "81": { condition: "Moderate rain showers", icon: "rainy" },
    "82": { condition: "Violent rain showers", icon: "rainy" },
    "85": { condition: "Slight snow showers", icon: "snow" },
    "86": { condition: "Heavy snow showers", icon: "snow" },

    // thunderstorms
    "95": { condition: "Thunderstorm", icon: "storm" },
    "96": { condition: "Thunderstorm with slight hail", icon: "storm" },
    "99": { condition: "Thunderstorm with heavy hail", icon: "storm" },
};

export const getWeatherCondition = (code: number): { condition: string; icon: string } => {
    return weatherMap[code.toString()] || { condition: "Unknown", icon: "cloudy" };
};

export const iconMap: { [key: string]: (size: number) => JSX.Element } = {
    "sunny": size => <Sun size={size} className="text-yellow-400" />,
    "partly-cloudy": size => <Cloud size={size} className="text-gray-400" />,
    "cloudy": size => <Cloud size={size} className="text-gray-400" />,
    "rainy": size => <CloudRain size={size} className="text-blue-400" />,
    "drizzle": size => <CloudDrizzle size={size} className="text-blue-300" />,
    "snow": size => <CloudSnow size={size} className="text-blue-200" />,
    "storm": size => <CloudLightning size={size} className="text-purple-400" />,
    "windy": size => <Wind size={size} className="text-gray-500" />,
};
