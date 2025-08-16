import React from "react";
import type { Location } from "../types";
import { Loader2 } from "lucide-react";

interface Props {
    locations: Location[];
    loading?: boolean;
    changeLocation: (location: Location) => void;
}

const SearchBarLocations: React.FC<Props> = ({ locations, loading = false, changeLocation }) => {
    const showDropdown = loading || (locations && locations.length > 0);
    if (!showDropdown) {
        return null;
    }
    return (
        <ul className="absolute left-0 right-0 mt-2 max-h-64 overflow-auto rounded-lg bg-white shadow-lg ring-1 ring-black/5 z-20">
            {loading && (
                <li className="px-4 py-3 flex items-center gap-2 text-gray-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching...
                </li>
            )}
            {!loading && locations.map((location, idx) => (
                <li
                    key={`${location.latitude},${location.longitude}-${idx}`}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => changeLocation(location)}
                >
                    {location.city}
                </li>
            ))}
            {!loading && locations.length === 0 && (
                <li className="px-4 py-3 text-gray-500">No results</li>
            )}
        </ul>
    );
};

export default SearchBarLocations;
