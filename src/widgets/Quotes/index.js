import React from 'react';
import Quotes from './QuotesW';
import QuotesForm from './QuotesForm';
import { MessageCircle as QuotesIcon } from 'react-feather';

export default {
    type: 'quotes',
    name: 'Quotes',
    icon: <QuotesIcon />,
    form: <QuotesForm />,
    el: <Quotes />,
}