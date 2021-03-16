import React from 'react';

/** Adding New Widget Form:
 * 1. Import your Widget.
 * 2. Copy the below export and add it to the bottom of the exports.
 * 3. Fill in the information. Use the same KEY for the WidgetForm (in ../forms/index.js) and the
 *    Widget.
 */
// export const WIDGET  = { type: 'KEY', el: '<Widget />' };

import Weather from "./Weather/Weather";
import Clock from "./Clock/Clock";
import Calendar from "./Calendar/Calendar";
import ExchangeRate from "./ExchangeRate/ExchangeRate";

export const WEATHER        = { type: 'weather', el: <Weather /> };
export const CLOCK          = { type: 'clock', el: <Clock /> };
export const CALENDAR       = { type: 'calendar', el: <Calendar /> };
export const EXCHANGE       = { type: 'exchange', el: <ExchangeRate /> };