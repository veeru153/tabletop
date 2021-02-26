import React, { useState, useEffect } from 'react';
import Widget from '../../containers/Widget';
import classes from './Calendar.module.css';
import { DateTime } from 'luxon';

const Calendar = (props) => {
    const { id, meta, } = props;
    const dt = DateTime.local();
    const { monthLong, year } = dt;
    const [cal, setCal] = useState([]);
    const daysArrayMon = ["M", "T", "W", "T", "F", "S", "S"];
    const daysArraySun = ["S", "M", "T", "W", "T", "F", "S"];
    const daysArray = meta.q.startsMonday ? daysArrayMon : daysArraySun;
    
    useEffect(() => {
        const tempCal = generateCal(meta.q.startsMonday, dt);
        setCal([...daysArray, ...tempCal]);
    }, [])

    return (
        <Widget
            id={id}
            meta={meta}
            className={classes.Calendar}
        >
            <div className={classes.header}>
                <div className={classes.month}>{monthLong}</div>
                <div className={classes.year}>{year}</div>
            </div>
            <hr />
            <div className={classes.calContainer}>
                {cal.map((day, i) => <Day day={day} i={i} dt={dt} startsMonday={meta.q.startsMonday} />)}
            </div>
        </Widget>
    )
}

const Day = (props) => {
    const { day, i, dt, startsMonday } = props;
    const isSunday = (!startsMonday && (i % 7 === 0)) || (startsMonday && (i % 7 === 6));
    const dayClasses = [classes.day, isSunday ? classes.sunday : ""].join(' ');

    return (
        <div 
            className={dayClasses}
            style={{ 
                backgroundColor: dt.day === day ? "tomato" : "transparent",
                color: dt.day === day ? "rgb(32,32,32)" : "#dedede"
            }}
        >
            {day !== 0 ? day : " "}
        </div>
    )
}

const generateCal = (startsMonday, dt) => {
    const firstDayOfMonth = DateTime.local(dt.year, dt.month, 1);
    const firstDay = startsMonday ? firstDayOfMonth.weekday : firstDayOfMonth.weekday + 1;
    const { daysInMonth } = dt;
    const tempCal = new Array(35).fill(0);
    let dayPtr = 1;

    for(let i=1; i<=35; i++) {
        if(i < firstDay || dayPtr > daysInMonth) continue;
        tempCal[i-1] = dayPtr;
        dayPtr++;
    }

    return tempCal;
}

export default Calendar;