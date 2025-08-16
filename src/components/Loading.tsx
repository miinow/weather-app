import * as React from "react";
import { Loader2 } from "lucide-react";

const Loading: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="flex flex-col items-center">
                <Loader2 className="animate-spin text-blue-500" size={80} />
            </div>
        </div>);
};

export default Loading;