import Clock from './ClockW';
import ClockForm from './ClockForm';
import { Clock as ClockIcon } from 'lucide-react';

export default {
    type: 'clock',
    name: 'Clock',
    icon: <ClockIcon />,
    form: <ClockForm />,
    // @ts-ignore
    el: <Clock />,
}