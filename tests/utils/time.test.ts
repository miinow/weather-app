import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import dayjs from "dayjs";
import { getDate, getDayName } from "../../src/utils/time";

// Choose a fixed reference date
const fixedDate = new Date("2025-01-15T12:00:00Z");

describe("utils/time", () => {

    beforeAll(() => {
        vi.useFakeTimers();
        vi.setSystemTime(fixedDate);
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    it("getDate returns YYYY-MM-DD with offset from today", () => {
        expect(getDate(0)).toBe(dayjs(fixedDate).format("YYYY-MM-DD"));
        expect(getDate(1)).toBe(dayjs(fixedDate).add(1, "day").format("YYYY-MM-DD"));
        expect(getDate(-3)).toBe(dayjs(fixedDate).add(-3, "day").format("YYYY-MM-DD"));
    });

    it("getDayName returns correct weekday for given date", () => {
        const someDate = "2025-01-12"; // Sunday
        expect(getDayName(someDate)).toBe(dayjs(someDate).format("dddd"));
    });
});
