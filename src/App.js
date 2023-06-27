import React, { useState } from "react";
import Calendar from "./components/DateCalender/Calendar";
import "./styles.scss";

export default function App() {
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <div className="App">
      <Calendar
        date={new Date('2022-06-01')}
        onChangeDate={(date) => setSelectedDate(date)}
      />
      <label>{selectedDate.toString()}</label>
    </div>
  );
}
