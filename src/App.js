import React, { useState } from "react";
import Calendar from "./Calendar";
function App() {
  const today = new Date();
  const [selectDate, setSelectDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
  React.useEffect(() => {
    console.log(">>>", selectDate);
  }, [selectDate]);
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
