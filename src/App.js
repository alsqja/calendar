import React from "react";
import styled from "styled-components";

function App() {
  const getFullMonth = (yearMonth) => {
    const curMonthStart = new Date(yearMonth[0], yearMonth[1] - 1); //Date 객체로 생성
    const preMonthEnd = new Date(yearMonth[0], yearMonth[1] - 1, 0).getDate(); //이전달 끝나는 날
    const curStartDate = curMonthStart.getDay(); //이번달 시작 요일 -> 일요일 0 ~ 토요일 6
    const curEndDate = new Date(yearMonth[0], yearMonth[1], 0).getDate();
    let list = [[]];

    for (let i = curStartDate - 1; i >= 0; i--) {
      const preDate = new Date(yearMonth[0], yearMonth[1] - 2, preMonthEnd - i);
      list[0].push({
        year: preDate.getFullYear(),
        month: preDate.getMonth() + 1,
        date: preDate.getDate(),
        dateObj: preDate,
      });
    }

    for (let i = 1, j = 0; i <= curEndDate; i++) {
      if (list[j].length === 7) {
        j++;
        list.push([]);
      }
      list[j].push({
        year: yearMonth[0],
        month: yearMonth[1],
        date: i,
        dateObj: new Date(yearMonth[0], yearMonth[1] - 1, i),
      });
    }
    let i = 0;
    while (list[list.length - 1].length < 7) {
      i++;
      const nextDate = new Date(yearMonth[0], yearMonth[1], i);
      list[list.length - 1].push({
        year: nextDate.getFullYear(),
        month: nextDate.getMonth() + 1,
        date: nextDate.getDate(),
        dateObj: nextDate,
      });
    }
  };
  getFullMonth([2021, 1]);

  return <div className="App"></div>;
}

export default App;
