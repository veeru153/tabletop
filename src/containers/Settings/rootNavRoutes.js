import React from 'react';
import AddWidgetForm from './forms/AddWidgetForm';
import RemoveWidgetForm from './forms/RemoveWidgetForm';
import ConfigForm from './forms/ConfigForm';
import SecretsForm from './forms/SecretsForm';

import { PlusSquare, Trash2, Settings, Key } from 'react-feather';

const rootNavRoutes = [
    { 
        key: 'addWidget',
        icon: <PlusSquare />, 
        name: 'Add Widget', 
        next: <AddWidgetForm />
    },
    { 
        key: 'removeWidget',
        icon: <Trash2 />, 
        name: 'Remove Widgets', 
        next: <RemoveWidgetForm />
    },
    { 
        key: 'config',
        icon: <Settings />, 
        name: 'Configure', 
        next: <ConfigForm />
    },
    { 
        key: 'secrets',
        icon: <Key />, 
        name: 'Secrets', 
        next: <SecretsForm />
    },
];

export default rootNavRoutes;