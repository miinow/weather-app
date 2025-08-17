import { describe, it, expect } from "vitest";
import * as React from "react";
import { render } from "@testing-library/react";
import WeatherIcon from "../../src/components/WeatherIcon";

describe("WeatherIcon", () => {
    it("falls back to Cloud icon when unknown key provided", () => {
        const { container } = render(<WeatherIcon icon="not-a-real-icon" size={24} />);
        // lucide-react renders an svg element; our fallback applies text-gray-400 class
        const svg = container.querySelector("svg");
        expect(svg).toBeTruthy();
        expect(svg?.getAttribute("class") || "").toContain("text-gray-400");
    });
});
