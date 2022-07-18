import React, { useState } from "react";
import Calendar from "./components/Calendar";
function App() {
  const today = new Date();
  const [selectDate, setSelectDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
  return (
    <>
      <Calendar
        today={today}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />
    </>
  );
}

export default App;
