import React from "react";
import styled from "styled-components";

function App() {
  const getFullMonth = (yearMonth) => {
    //yearMonth -> [년, 월] 리스트
    // const weekDayList = ["일", "월", "화", "수", "목", "금", "토"];
    const curMonthStart = new Date(yearMonth[0], yearMonth[1] - 1); //Date 객체로 생성
    const preMonthEnd = new Date(yearMonth[0], yearMonth[1] - 1, 0).getDate(); //이전달 끝나는 날
    const curStartDate = curMonthStart.getDay(); //이번달 시작 요일 -> 일요일 0 ~ 토요일 6
    const curEndDate = new Date(yearMonth[0], yearMonth[1], 0).getDate();
    let list = [[]];
    for (let i = curStartDate - 1; i >= 0; i--) {
      // ! 이전달
      list[0].push({
        year: yearMonth[0],
        month: yearMonth[1] - 1,
        date: preMonthEnd - i,
        dateObj: new Date(yearMonth[0], yearMonth[1] - 2, preMonthEnd - i),
      });
    }

    for (let i = 1, j = 0; i <= curEndDate; i++) {
      // ! 이번달 채워넣기
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
      list[list.length - 1].push({
        year: yearMonth[0],
        month: yearMonth[1] + 1,
        date: ++i,
        dateObj: new Date(yearMonth[0], yearMonth[1], i),
      });
    }
    console.log(list);
    // const weekDay = curStartDate.substring(12, 13);
    // let preEndDate;
    // if (weekDay !== "일") {
    //   switch (curStartDate.substring(5, 7)) {
    //     case "01":
    //     case "02":
    //     case "04":
    //     case "06":
    //     case "08":
    //     case "09":
    //     case "11":
    //       preEndDate = 31;
    //       break;
    //     case "03":
    //       preEndDate = 28;
    //       break;
    //     default:
    //       preEndDate = 30;
    //       break;
    //   }
    // }
    // let list = [[]];
    // for (let i = weekDayList.indexOf(weekDay) - 1; i >= 0; i--) {
    //   const date = new Date(
    //     yearMonth.split(". ")[0],
    //     yearMonth.split(". ")[1] - 2,
    //     preEndDate - i
    //   );
    //   list[0].push({
    //     key: date.getDate(),
    //     date: date,
    //     day: date.getDate(),
    //     month: "pre",
    //   });
    // }

    // let j = 0;
    // for (let i = 1; i <= monthEnd; i++) {
    //   const date = new Date(
    //     yearMonth.split(". ")[0],
    //     yearMonth.split(". ")[1] - 1,
    //     i
    //   );
    //   if (list[j].length < 7)
    //     list[j].push({
    //       key: date.getDate(),
    //       date,
    //       date,
    //       day: date.getDate(),
    //       month: "cur",
    //     });
    //   else {
    //     j++;
    //     list.push([
    //       {
    //         key: date.getDate(),
    //         date,
    //         date,
    //         day: date.getDate(),
    //         month: "cur",
    //       },
    //     ]);
    //   }
    // }
    // let i = 1;
    // while (list[list.length - 1].length < 7) {
    //   const date = new Date(
    //     yearMonth.split(". ")[0],
    //     yearMonth.split(". ")[1],
    //     i
    //   );
    //   list[list.length - 1].push({
    //     key: date.getDate(),
    //     date,
    //     date,
    //     day: date.getDate(),
    //     month: "cur",
    //   });
    //   i++;
    // }
    // return list;
  };
  getFullMonth([2021, 12]);
  // const list = getFullMonth([2022, 7]);

  // console.log(list);

  return <div className="App"></div>;
}

export default App;
