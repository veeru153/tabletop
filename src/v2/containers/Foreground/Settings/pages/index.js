import React from 'react';
import { PlusSquare, Trash2, Tool, Key, Info, Image } from 'react-feather';
import AddWidget from './AddWidget';
import Background from './Background';
import Secrets from './Secrets';
import About from './About';

const settingsNavRoutes = [
    // { 
    //     key: 'addWidget',
    //     icon: <PlusSquare />, 
    //     name: 'Add Widget', 
    //     next: <AddWidget />
    // },
    // { 
    //     key: 'removeWidget',
    //     icon: <Trash2 />, 
    //     name: 'Remove Widgets', 
    //     // next: <RemoveWidgetForm />
    // },
    // { 
    //     key: 'config',
    //     icon: <Tool />, 
    //     name: 'Configure', 
    //     // next: <ConfigForm />
    // },
    { 
        key: 'background',
        icon: <Image />, 
        name: 'Background', 
        next: <Background />
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