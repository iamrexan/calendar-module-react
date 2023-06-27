import React, { useState } from "react";
import Calendar from "./DateCalender/Calendar";
import "./styles.scss";

export default function App() {
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <div className="App">
      <Calendar
        date={new Date()}
        onChangeDate={(date) => setSelectedDate(date)}
      />
      <label>{selectedDate.toString()}</label>
    </div>
  );
}
