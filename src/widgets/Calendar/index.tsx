import Calendar from './CalendarW';
import CalendarForm from './CalendarForm';
import { Calendar as CalendarIcon } from 'lucide-react';

export default {
    type: 'calendar',
    name: 'Calendar',
    icon: <CalendarIcon />,
    form: <CalendarForm />,
    // @ts-ignore
    el: <Calendar />,
}