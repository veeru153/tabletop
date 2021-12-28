import React, { useState, useEffect } from 'react';
import Widget from '../../containers/Widget';
import classes from './Calendar.module.scss';
import { DateTime } from 'luxon';

const Calendar_Month = (props) => {
    const { id, meta, content } = props;
    const { params, data } = content;
    const daysArrayMon = ["M", "T", "W", "T", "F", "S", "S"];
    const daysArraySun = ["S", "M", "T", "W", "T", "F", "S"];
    const daysArray = params.startsMonday ? daysArrayMon : daysArraySun;

    const [dt, setDt] = useState(DateTime.local());
    const { monthLong, year } = dt;
    const [cal, setCal] = useState([]);
    
    useEffect(() => {
        const secInterval = setInterval(() => {
            setDt(DateTime.local())
            const tempCal = generateCal(params.startsMonday, dt);
            setCal([...daysArray, ...tempCal]);
        }, 1000)

        return () => clearInterval(secInterval);
    }, [])

    return (
        <Widget
            {...props}
            className={classes.CalendarMonth}
        >
            <div className={classes.header}>
                <div className={classes.month}>{monthLong}</div>
                <div className={classes.year}>{year}</div>
            </div>
            <hr />
            <div className={classes.calContainer}>
                {cal.map((day, i) => <Day key={i} day={day} i={i} dt={dt} startsMonday={params.startsMonday} />)}
            </div>
        </Widget>
    )
}

const Day = (props) => {
    const { day, i, dt, startsMonday } = props;
    const isSunday = (!startsMonday && (i % 7 === 0)) || (startsMonday && (i % 7 === 6));
    const dayClasses = [classes.day, isSunday ? classes.sunday : ""].join(' ');
    const dayColor = (isSunday ? "tomato" : "#dedede");
    // const dayColor = dt.day === day ? "white" : "#dedede";
    const isDay = ["M", "T", "W", "T", "F", "S", "S"].includes(day);
    const isActive = (isDay || day == dt.day);

    return (
        <div 
            className={dayClasses}
            style={{ 
                opacity: isActive ? "100%" : "45%",
                color: dayColor,
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

    const lastDayAdded = dayPtr;

    while(dayPtr <= daysInMonth) {
        tempCal[(dayPtr % lastDayAdded)] = dayPtr;
        dayPtr++;
    }

    return tempCal;
}

export default Calendar_Month;