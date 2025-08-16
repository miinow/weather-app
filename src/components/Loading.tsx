import * as React from "react";
import { Loader2 } from "lucide-react";

const Loading: React.FC = () => {
    return (
        <div className="bg-white shadow-2xl flex-1 flex flex-col justify-center items-center p-8 min-h-[28rem]" aria-busy="true" aria-label="Loading weather data">
            <Loader2 className="h-20 w-20 animate-spin text-blue-500" />
        </div>
    );
};

export default Loading;