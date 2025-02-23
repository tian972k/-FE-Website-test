import { useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@app/lib/utils";
import { localeMapping } from "./constants";
import { CalendarProps } from "./types";
import { generateDays, getOccupationText } from "./utils";
import "./calendar.css";

const Calendar: React.FC<CalendarProps> = ({
  locale = "fr",
  initialDate = dayjs().format("YYYY-MM-DD"),
  occupiedDates = [],
}) => {
  const [currentDate, setCurrentDate] = useState(dayjs(initialDate));
  const localeData = localeMapping[locale];

  const firstDayOfMonth = currentDate.startOf("month").day();
  const daysInMonth = currentDate.daysInMonth();
  const prevMonthDays = currentDate.subtract(1, "month").daysInMonth();

  const changeMonth = (direction: number) => {
    setCurrentDate(currentDate.add(direction, "month"));
  };

  const days = generateDays(
    currentDate,
    occupiedDates,
    firstDayOfMonth,
    daysInMonth,
    prevMonthDays,
  );

  return (
    <div className="calendar">
      <div className="flex justify-center">
        <div className="flex items-center gap-2 mt-2 text-gray-700">
          <button onClick={() => changeMonth(-1)} aria-label="Previous month">
            <ChevronLeft className="nav-button" />
          </button>
          <span className="text-[20px] font-semibold">
            {localeData.months[currentDate.month()]} {currentDate.year()}
          </span>
          <button onClick={() => changeMonth(1)} aria-label="Next month">
            <ChevronRight className="nav-button" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 mt-4">
        {localeData.days.map((day) => (
          <div key={day} className="text-center font-semibold text-[#562C2C]">
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "day-base",
              day.isCurrentMonth ? cn("day-current", day.isOccupied && "occupied") : "day-other",
            )}
          >
            <span>{day.day}</span>
            {day.isCurrentMonth && (
              <span className={cn("status-text", day.isOccupied ? "occupied" : "free")}>
                {getOccupationText(day.isOccupied, locale)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
