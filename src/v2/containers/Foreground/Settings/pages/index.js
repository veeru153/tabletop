import React from 'react';
import { PlusSquare, Trash2, Settings, Key, Info } from 'react-feather';
import { Wallpaper } from '@material-ui/icons';
import AddWidget from './AddWidget';
import Secrets from './Secrets';
import About from './About';

const settingsNavRoutes = [
    { 
        key: 'addWidget',
        icon: <PlusSquare />, 
        name: 'Add Widget', 
        next: <AddWidget />
    },
    { 
        key: 'removeWidget',
        icon: <Trash2 />, 
        name: 'Remove Widgets', 
        // next: <RemoveWidgetForm />
    },
    { 
        key: 'config',
        icon: <Settings />, 
        name: 'Configure', 
        // next: <ConfigForm />
    },
    { 
        key: 'background',
        icon: <Wallpaper />, 
        name: 'Background', 
        // next: <ConfigForm />
    },
    { 
        key: 'secrets',
        icon: <Key />, 
        name: 'Secrets', 
        next: <Secrets />
    },
    { 
        key: 'about',
        icon: <Info />, 
        name: 'About', 
        next: <About />
    },
];

export default settingsNavRoutes;