import React from 'react';
import { calendarStyles } from './CalendarStyle';

export const CalendarView = ({
  rows, title, onPrev, onNext, onTitleClick, onTodayClick
}) => {

  const getCell = (cell) => {
    return (
      <span
        style={calendarStyles.cell}
        key={cell.data}
        onClick={(e) => {
          console.log(cell.data)
        }}>
        {cell.text}
      </span>
    )
  }

  const getRow = (row, id) => {
    return (
      <div key={id} style={calendarStyles.row}>
        {row}
      </div>
    )
  }

  const getCells = () => {
    const data = [];
    rows.forEach(cells => {
      let row = [];
      cells.forEach(cell => {
        row.push(getCell(cell))
      })
      data.push(getRow(row, cells[0].data))
    });
    return data;
  }

  return (
    <div style={calendarStyles.root}>

      <div style={calendarStyles.header}>
        <span onClick={onPrev}>
          {'<'}
        </span>
        <span onClick={onTitleClick}>
          {title}
        </span>
        <span onClick={onNext}>
          {'>'}
        </span>
      </div>

      <div style={calendarStyles.body}>
        {getCells()}
      </div>

      <div onClick={onTodayClick}>
        Today
      </div>
    </div>
  )
}
