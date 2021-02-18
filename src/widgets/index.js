import React from 'react';

import Weather from "./Weather/Weather";
import Clock from "./Clock/Clock";

export const WEATHER    = { type: 'weather', el: <Weather /> };
export const CLOCK      = { type: 'clock', el: <Clock /> };