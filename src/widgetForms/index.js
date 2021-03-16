import React from 'react';

/** Adding New Widget Form:
 * 1. Import your WidgetForm.
 * 2. Copy the below export and add it to the bottom of the exports.
 * 3. Fill in the information. Use the same KEY for the Widget (in ../widgets/index.js) and the
 *    WidgetForm.
 */
// export const WIDGET  = { key: 'KEY', img: 'IMAGE', name: 'NAME', next: <WidgetForm /> };

import WeatherForm from './WeatherForm';
import ClockForm from './ClockForm';
import CalendarForm from './CalendarForm';
import ExchangeRateForm from './ExchangeRateForm';

import {
    Cloud,
    Clock,
    Calendar,
    DollarSign
} from 'react-feather';

export const WEATHER    = { key: 'weather', icon: <Cloud />, name: 'Weather', next: <WeatherForm /> };
export const CLOCK      = { key: 'clock', icon: <Clock />, name: 'Clock', next: <ClockForm /> };
export const CALENDAR   = { key: 'calendar', icon: <Calendar />, name: 'Calendar', next: <CalendarForm /> };
export const CURRENCY   = { key: 'exchangeRate', icon: <DollarSign />, name: 'Exchange Rate', next: <ExchangeRateForm /> };