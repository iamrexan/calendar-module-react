import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./Calendar.Module.scss";

const listBlankDayBox = (firstDayOfMonth) =>
  Array.from({ length: firstDayOfMonth }, (_, index) => (
    <td key={`blank-${index}`} className="calendar-day empty">
      {""}
    </td>
  ));

const listDayBox = (
  daysInMonth,
  onChangeDate,
  currentMonthAndCurrentYear,
  currentDate,
  currentDay
) => {
  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = moment(currentDate).date(index);
    const isCuttentDay = currentMonthAndCurrentYear && index === currentDay;
    return (
      <td
        key={`day-${index}`}
        className={`calendar-day ${
          isCuttentDay ? "calendar-day-highlight" : ""
        }`}
        onClick={() => onChangeDate(day)}
      >
        {day.format("D")}
      </td>
    );
  });
};

const Calendar = ({ date, onChangeDate }) => {
  const [currentDateNonChangable] = useState(moment(date));
  const [currentDate, setCurrentDate] = useState(moment(date));

  const firstDayOfMonth = moment(currentDate).startOf("month").format("d");
  const daysInMonth = moment(currentDate).daysInMonth();
  const monthName = moment(currentDate).format("MMMM");
  const year = moment(currentDate).format("YYYY");

  const currentDay = currentDateNonChangable.date();
  const currentMonth = currentDateNonChangable.format("MMMM");
  const currentYear = currentDateNonChangable.format("YYYY");
  const currentMonthAndCurrentYear =
    currentMonth === monthName && currentYear === year;

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const blanks = listBlankDayBox(firstDayOfMonth);

  const days = listDayBox(
    daysInMonth,
    onChangeDate,
    currentMonthAndCurrentYear,
    currentDate,
    currentDay
  );

  const totalSlots = [...blanks, ...days];
  const rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  const handlePrevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month"));
  };

  const renderCalendar = () => (
    <div className="calendar">
      <table className="calendar-table">
        <thead>
          <tr>
            <th colSpan="7" className="calendar-header">
              <button className="calendar-header-btn" onClick={handlePrevMonth}>
                &lt;
              </button>
              {monthName} {year}
              <button className="calendar-header-btn" onClick={handleNextMonth}>
                &gt;
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekdays.map((day) => (
              <td key={day} className="calendar-day-header">
                {day}
              </td>
            ))}
          </tr>
          {rows.map((row, i) => (
            <tr key={`row-${i}`}>{row}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return renderCalendar();
};

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date)
};

Calendar.defaultProps = {
  date: new Date()
};

export default Calendar;
