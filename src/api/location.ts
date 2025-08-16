import type { Location, LocationResponse } from "../types";

const baseUrl = "https://geocoding-api.open-meteo.com/v1/search";

export async function getLocations(name: string): Promise<Location[]> {
    const url = `${baseUrl}?name=${encodeURIComponent(name)}&count=10`;
    const res = await fetch(url);
    const data = await res.json();
    const { results } = data;

    return results.map((location: LocationResponse) => {
        return {
            latitude: location.latitude,
            longitude: location.longitude,
            city: [location.name, location.admin1, location.country].filter(Boolean).join(", "),
        } as Location;
    });
}