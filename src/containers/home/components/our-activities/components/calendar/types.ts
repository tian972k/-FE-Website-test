export interface CalendarProps {
  locale?: "en" | "fr";
  initialDate?: string;
  occupiedDates?: string[];
}

export interface CalendarDay {
  day: number;
  isOccupied: boolean;
  isCurrentMonth: boolean;
}
