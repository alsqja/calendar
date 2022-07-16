import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
const OpenButton = styled.div`
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 10px;
  font-size: 20px;
  color: gray;
  cursor: pointer;
  position: relative;
  ${({ modal }) =>
    modal &&
    css`
      color: white;
      background-color: darkgray;
    `}
`;

const CalendarContainer = styled.div`
  margin-top: 20px;
  background-color: white;
  position: absolute;
  z-index: 10;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  width: 350px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
  font-size: 20px;
`;

const HeaderArrow = styled.div`
  cursor: pointer;
  :hover {
    color: darkgray;
  }
`;

const HeaderText = styled.div``;

const DateGrid = styled.div`
  width: 100%;
  height: 350px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 45px;
  column-gap: 5px;
  row-gap: 5px;
`;
const DateBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  border-radius: 50%;
  border: 1px solid white;
  cursor: pointer;

  ${({ current }) =>
    !current &&
    css`
      color: gray;
      :hover {
        border: 1px solid lightgray;
      }
    `}
  ${({ selcted }) =>
    selcted &&
    css`
      background-color: black;
      color: white;
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
  border-radius: 3px;
  background-color: black;
  color: white;
`;

function Calendar({ today, selectDate, setSelectDate }) {
  const [modal, setModal] = useState(false);
  const [yearMonth, setYearMonth] = useState([
    today.getFullYear(),
    today.getMonth() + 1,
  ]);

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

  const calendarHandel = (arrow) => {
    let year = yearMonth[0];
    let month = yearMonth[1];
    switch (arrow) {
      case "pre":
        if (month === 1) {
          year--;
          month = 12;
        } else month--;
        break;
      case "next":
        if (month === 12) {
          year++;
          month = 1;
        } else month++;
        break;
    }
    setYearMonth([year, month]);
  };

  const selectDateHandle = (day) => {
    setSelectDate(day.dateObj);
  };

  return (
    <>
      <OpenButton modal={modal} onClick={() => setModal(!modal)}>
        달력
      </OpenButton>
      {modal && (
        <>
          <CalendarContainer>
            <Header>
              <HeaderArrow onClick={() => calendarHandel("pre")}>
                <FaCaretLeft />
              </HeaderArrow>
              <HeaderText>
                {yearMonth[0]}.
                {yearMonth[1] < 10 ? `0${yearMonth[1]}` : yearMonth[1]}
              </HeaderText>
              <HeaderArrow onClick={() => calendarHandel("next")}>
                <FaCaretRight />
              </HeaderArrow>
            </Header>
            <WeekGrid>
              {["일", "월", "화", "수", "목", "금", "토"].map((el, index) => (
                <WeekBox key={index}>{el}</WeekBox>
              ))}
            </WeekGrid>
            <DateGrid>
              {getFullMonth(yearMonth).map((week, index) =>
                week.map((day, idx) => (
                  <DateBox
                    key={idx}
                    current={day.state === "cur"}
                    selcted={String(selectDate) === String(day.dateObj)}
                    onClick={() => day.state === "cur" && selectDateHandle(day)}
                  >
                    {day.date}
                  </DateBox>
                ))
              )}
            </DateGrid>
          </CalendarContainer>
        </>
      )}
    </>
  );
}

export default Calendar;
