import Quotes from './QuotesW';
import QuotesForm from './QuotesForm';
import { MessageCircle as QuotesIcon } from 'lucide-react';

export default {
    type: 'quotes',
    name: 'Quotes',
    icon: <QuotesIcon />,
    form: <QuotesForm />,
    // @ts-ignore
    el: <Quotes />,
}