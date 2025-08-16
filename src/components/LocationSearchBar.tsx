import * as React from "react";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../hooks/useDebounce.ts";
import { getLocations } from "../api/location.ts";
import { Search } from "lucide-react";
import type { Location } from "../types";
import SearchBarLocations from "./SearchBarLocations";

interface Props {
    onSelect: (location: Location) => void;
}

const LocationSearchBar: React.FC<Props> = ({ onSelect }) => {
    const [value, setValue] = useState("");
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(value);
    const requestIdRef = useRef(0);

    useEffect(() => {
        fetchLocations();
    }, [debounced]);

    const handleInput = (value: string) => {
        setValue(value);
        if (!value) {
            setLocations([]);
            setLoading(false);
            return;
        }
    };

    const fetchLocations = async () => {
        const query = value.trim();
        if (!query) {
            setLocations([]);
            setLoading(false);
            return;
        }
        const currentId = ++requestIdRef.current;
        try {
            setLoading(true);
            const locationList = await getLocations(query);
            if (currentId !== requestIdRef.current) {
                return;
            }
            setLocations(locationList || []);
        } catch (e) {
            if (currentId !== requestIdRef.current) {
                return;
            }
            setLocations([]);
        } finally {
            if (currentId === requestIdRef.current) {
                setLoading(false);
            }
        }
    };

    const changeLocation = (location: Location) => {
        setValue("");
        setLocations([]);
        setLoading(false);
        onSelect(location);
    };

    return (
        <div className="relative block h-8 w-80">
            <div className="absolute left-4 inset-y-0 z-10 flex items-center text-gray-400">
                <Search className="h-6 w-6" />
            </div>
            <input
                value={value}
                onChange={(e) => handleInput(e.target.value)}
                placeholder="Search for location..."
                className="h-full w-full rounded-lg border-0 pl-12 pr-10 outline-none placeholder:text-gray-400 shadow shadow-gray-300 text-sm"
            />
            {value && (
                <SearchBarLocations
                    locations={locations}
                    changeLocation={changeLocation}
                    loading={loading}
                />
            )}
        </div>
    );
};

export default LocationSearchBar;