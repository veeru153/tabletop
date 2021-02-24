import React from 'react';

import WeatherForm from './WeatherForm';
import ClockForm from './ClockForm';

import {
    Cloud,
    Clock,
} from 'react-feather';

export const WEATHER    = { key: 'weather', icon: <Cloud />, name: 'Weather', next: <WeatherForm /> };
export const CLOCK      = { key: 'clock', icon: <Clock />, name: 'Clock', next: <ClockForm /> };


/** Adding New Widget Form:
 * 1. Import your WidgetForm.
 * 2. Copy the below export and add it to the bottom of the exports.
 * 3. Fill in the information. Use the same KEY for the Widget (in ../widgets/index.js) and the
 *    WidgetForm.
 */
// export const WIDGET  = { key: 'KEY', img: 'IMAGE', name: 'NAME', next: <WidgetForm /> };