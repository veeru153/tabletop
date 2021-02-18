import React from 'react';

import WeatherForm from './WeatherForm';
import ClockForm from './ClockForm';

export const WEATHER    = { key: 'weather', img: '', name: 'Weather', next: <WeatherForm /> };
export const CLOCK      = { key: 'clock', img: '', name: 'Clock', next: <ClockForm /> };