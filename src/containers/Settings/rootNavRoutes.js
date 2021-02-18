import React from 'react';
import AddWidgetForm from './AddWidgetForm';

const rootNavRoutes = [
    { 
        key: 'addWidget',
        img: '', 
        name: 'Add Widget', 
        next: <AddWidgetForm />
    },
    { 
        key: 'removeWidget',
        img: '', 
        name: 'Remove Widgets', 
        next: null
    },
    { 
        key: 'config',
        img: '', 
        name: 'Configure', 
        next: null
    },
    { 
        key: 'secrets',
        img: '', 
        name: 'Secrets', 
        next: null
    },
];

export default rootNavRoutes;