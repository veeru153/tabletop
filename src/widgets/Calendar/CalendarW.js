import React from 'react';
import Calendar_Date from './CalendarW_Date';
import Calendar_Month from './CalendarW_Month';

const Calendar = (props) => {
    if(props.content.params.daily) return <Calendar_Date {...props} />
    return <Calendar_Month {...props} />
}

export default Calendar;