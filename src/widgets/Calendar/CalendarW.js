import React, { useState, useEffect } from 'react';
import Calendar_Date from './CalendarW_Date';
import Calendar_Month from './CalendarW_Month';

const Calendar = (props) => {
    const { id, meta, content } = props;
    const { params, data } = content;
    
    if(params.daily) return <Calendar_Date {...props} />
    return <Calendar_Month {...props} />
}

export default Calendar;