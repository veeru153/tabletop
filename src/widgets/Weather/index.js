import React from 'react';
import Weather from './WeatherW';
import WeatherForm from './WeatherForm';
import { Cloud as WeatherIcon } from 'react-feather';

export default {
    type: 'weather',
    name: 'Weather',
    icon: <WeatherIcon />,
    form: <WeatherForm />,
    el: <Weather />,
}