import { Dayjs } from "dayjs";
import { CalendarDay } from "./types";

export const generateDays = (
  currentDate: Dayjs,
  occupiedDates: string[],
  firstDayOfMonth: number,
  daysInMonth: number,
  prevMonthDays: number,
): CalendarDay[] => {
  const days: CalendarDay[] = [];
  const firstWeekdayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Add days from previous month
  for (let i = firstWeekdayIndex - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      isOccupied: false,
      isCurrentMonth: false,
    });
  }

  // Add current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = currentDate.set("date", day).format("YYYY-MM-DD");
    days.push({
      day,
      isOccupied: occupiedDates.includes(date),
      isCurrentMonth: true,
    });
  }

  // Add days from next month
  while (days.length < 35) {
    days.push({
      day: days.length - (firstWeekdayIndex + daysInMonth) + 1,
      isOccupied: false,
      isCurrentMonth: false,
    });
  }

  return days;
};

export const getOccupationText = (isOccupied: boolean, locale: "en" | "fr"): string => {
  return isOccupied
    ? locale === "fr"
      ? "Occupé"
      : "Occupied"
    : locale === "fr"
    ? "Libre"
    : "Free";
};
