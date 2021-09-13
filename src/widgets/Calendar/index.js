import React from 'react';
import Calendar from './CalendarW';
import CalendarForm from './CalendarForm';
import { Calendar as CalendarIcon } from 'react-feather';

export default {
    type: 'calendar',
    name: 'Calendar',
    icon: <CalendarIcon />,
    form: <CalendarForm />,
    el: <Calendar />,
}