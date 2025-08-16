import * as React from "react";
import { Cloud } from "lucide-react";
import { iconMap } from "../utils/weather.tsx";

const WeatherIcon: React.FC<{ icon: string; size?: number }> = ({ icon, size = 80 }) => {
    return iconMap[icon](size) || <Cloud size={size} className="text-gray-400" />;
};

export default WeatherIcon;