import React from 'react';
import Clock from './ClockW';
import ClockForm from './ClockForm';
import { Clock as ClockIcon } from 'react-feather';

export default {
    id: 'clock',
    name: 'Clock',
    icon: <ClockIcon />,
    form: <ClockForm />,
    el: <Clock />,
}