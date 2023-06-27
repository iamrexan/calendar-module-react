import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import moment from "moment";
import Calendar from "@components/DateCalender/Calendar";

describe("Calendar Component", () => {
  test("renders the calendar header with correct month and year", () => {
    const date = new Date("2022-06-15");
    const { container, getByTestId } = render(<Calendar date={date} />);
    const headerText = getByTestId('calendar-header-text');
    expect(headerText).toBeInTheDocument();
    expect(container.querySelector(".calendar-header-btn")).toBeTruthy();
  });

  test("renders the weekdays", async () => {
    const date = new Date("2022-06-15");
    const { container, getAllByTestId } = render(<Calendar date={date} />);
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    await waitFor(() => getAllByTestId('calendar-header-text'));
    weekdays.forEach((weekday) => {
      const weekdayElement = getAllByTestId(`calendar-day-${weekday}`);
      expect(weekdayElement).toBeTruthy();
    });
    expect(container.querySelectorAll(".calendar-day-header")).toHaveLength(7);
  });

  test("renders the days in the calendar", () => {
    const date = new Date("2022-06-15");
    const { container } = render(<Calendar date={date} />);
    const daysInMonth = moment(date).daysInMonth();
    expect(container.querySelectorAll('[data-testid="calenday-day-filled"]')).toHaveLength(
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
