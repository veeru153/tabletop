import React from 'react';
import AddWidgetForm from './forms/AddWidgetForm';
import RemoveWidgetForm from './forms/RemoveWidgetForm';
import ConfigForm from './forms/ConfigForm';
import SecretsForm from './forms/SecretsForm';

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
        next: <RemoveWidgetForm />
    },
    { 
        key: 'config',
        img: '', 
        name: 'Configure', 
        next: <ConfigForm />
    },
    { 
        key: 'secrets',
        img: '', 
        name: 'Secrets', 
        next: <SecretsForm />
    },
];

export default rootNavRoutes;