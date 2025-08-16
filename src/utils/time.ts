import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

export function getDate(days: number): string {
    return dayjs().add(days, "day").format(dateFormat);
}

export function getDayName(date: string): string {
    return dayjs(date).format("dddd");
}
