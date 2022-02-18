import Weather from './WeatherW';
import WeatherForm from './WeatherForm';
import { Cloud as WeatherIcon } from 'lucide-react';

export default {
    type: 'weather',
    name: 'Weather',
    icon: <WeatherIcon />,
    form: <WeatherForm />,
    // @ts-ignore
    el: <Weather />,
}