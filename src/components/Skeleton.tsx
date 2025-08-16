import * as React from "react";

const Skeleton: React.FC = () => {
    return (
        <div
            className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-lg animate-pulse min-w-[140px]"
        >
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-full mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
        </div>
    );
};

export default Skeleton;