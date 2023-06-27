import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import moment from "moment";
import Calendar from "../../DateCalender/Calendar";

describe("Calendar", () => {
  test("renders the calendar header with correct month and year", () => {
    const date = new Date("2022-06-15");
    const { container } = render(<Calendar date={date} />);
    const headerText = screen.getByText("June 2022");
    expect(headerText).toBeInTheDocument();
    expect(container.querySelector(".calendar-header-btn")).toBeTruthy();
  });

  test("renders the weekdays", () => {
    const { container } = render(<Calendar />);
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    weekdays.forEach((weekday) => {
      const weekdayElement = screen.getByText(weekday);
      expect(weekdayElement).toBeInTheDocument();
      expect(weekdayElement).toHaveClass("calendar-day-header");
    });
    expect(container.querySelectorAll(".calendar-day-header")).toHaveLength(7);
  });

  test("renders the days in the calendar", () => {
    const date = new Date("2022-06-15");
    const { container } = render(<Calendar date={date} />);
    const daysInMonth = moment(date).daysInMonth();
    expect(container.querySelectorAll(".calendar-day")).toHaveLength(
      daysInMonth
    );
  });

  test("calls onChangeDate when a day is clicked", () => {
    const onChangeDate = jest.fn();
    const date = new Date("2022-06-15");
    render(<Calendar date={date} onChangeDate={onChangeDate} />);
    const dayElement = screen.getByText("15");
    fireEvent.click(dayElement);
    expect(onChangeDate).toHaveBeenCalledWith(moment(date).date(15));
  });
});
