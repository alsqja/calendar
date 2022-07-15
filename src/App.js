import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div``;

const Header = styled.div`
  width: 350px;
  height: 20px;
  border: 1px solid red;
`;

const DateGrid = styled.div`
  width: 350px;
  height: 350px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: calc(350px / 7);
  column-gap: 5px;
  row-gap: 5px;
`;
const DateBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 13px;
  color: black;
  border: 1px solid lightgray;
  ${({ current }) =>
    !current &&
    css`
      color: gray;
    `}
`;
const WeekGrid = styled.div`
  width: 350px;
  height: 18px;
  margin-bottom: 3px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 3px;
`;
const WeekBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: dodgerblue;
  color: white;
`;

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
        state: "pre",
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
        state: "cur",
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
        state: "next",
      });
    }
    return list;
  };

  console.log(getFullMonth([2021, 1]));

  return (
    <Container>
      <Header></Header>
      <WeekGrid>
        {["일", "월", "화", "수", "목", "금", "토"].map((el, index) => (
          <WeekBox key={index}>{el}</WeekBox>
        ))}
      </WeekGrid>
      <DateGrid>
        {getFullMonth([2021, 1]).map((week, index) =>
          week.map((day, idx) => (
            <DateBox key={idx} current={day.state === "cur"}>
              {day.date}
            </DateBox>
          ))
        )}
      </DateGrid>
    </Container>
  );
}

export default App;
