import React, { useState, useEffect } from 'react';
import Widget from '../../containers/Widget';
import classes from './Calendar.module.scss';
import { DateTime } from 'luxon';

const Calendar_Date = (props) => {
    const { id, meta, content } = props;
    const { params, data } = content;
    const [dt, setDt] = useState(DateTime.local());
    const { day, weekdayLong, monthShort, year } = dt;
    
    useEffect(() => {
        const secInterval = setInterval(() => {
            setDt(DateTime.local())
        }, 1000)

        return () => clearInterval(secInterval);
    }, [])

    const isSunday = (weekdayLong === "Sunday");

    return (
        <Widget
            {...props}
            className={classes.CalendarDate}
        >
            <div className={classes.header}>
                <div className={classes.month}>{monthShort}</div>
                <div className={classes.year}>{year}</div>
            </div>
            <hr />
            <div>
                <div className={classes.date}>{day}</div>
                <div 
                    className={classes.weekday}
                    style={{ color: isSunday ? "tomato" : "#dedede"}}
                >{weekdayLong}</div>
            </div>
        </Widget>
    )
}

export default Calendar_Date;