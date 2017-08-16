import React from 'react';
import { calendarStyles as styles  } from './CalendarStyle';
import { CustomSpan } from '..';

export const CalendarView = ({
  rows, title, onPrev, onNext, onTitleClick, onTodayClick, onCellClick
}) => {

  const getCell = (cell) => {
    return (
      <CustomSpan
        style={Object.assign({}, styles.cell,
          cell.siblingLeftover
            ? styles.cellGrayed
            : null,
          cell.selected
            ? styles.cellSelection
            : null)}
        styleHover={styles.cellHover}
        key={cell.data}
        onClick={e => onCellClick(cell)}>
        {cell.text}
      </CustomSpan>
    )
  }

  const getRow = (row, id) => {
    return (
      <div key={id} style={styles.row}>
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
    <div style={styles.root}>
      <div style={styles.content}>
        <div style={styles.header}>
          <CustomSpan
            style={styles.navigationButton}
            styleHover={styles.hover}
            onClick={onPrev}>
            {'<'}
          </CustomSpan>
          <CustomSpan
            style={styles.caption}
            styleHover={styles.hover}
            onClick={onTitleClick}>
            {title}
          </CustomSpan>
          <CustomSpan
            style={styles.navigationButton}
            styleHover={styles.hover}
            onClick={onNext}>
            {'>'}
          </CustomSpan>
        </div>

        <div style={styles.body}>
          {getCells()}
        </div>

        <CustomSpan
          style={styles.todayButton}
          styleHover={styles.hover}
          onClick={onTodayClick}>
          Today
        </CustomSpan>
      </div>
    </div>
  )
}
