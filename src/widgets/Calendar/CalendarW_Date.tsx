import { useState, useEffect } from 'react';
import classes from './Calendar.module.scss';
import { DateTime } from 'luxon';
import { WidgetProps } from '../../common/util/types';

const Calendar_Date = ({ content, useClassName } : WidgetProps) => {
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
        <div className={classes.CalendarDate}>
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
        </div>
    )
}

export default Calendar_Date;