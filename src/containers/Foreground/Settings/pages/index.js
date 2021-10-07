import React from 'react';
import { Tool, Info, Image, RefreshCw } from 'react-feather';
import Configure from './Configure/';
import Background from './Background/';
import About from './About';

const settingsNavRoutes = [
    { 
        key: 'config',
        icon: <Tool />, 
        name: 'Configure', 
        next: <Configure />
    },
    { 
        key: 'background',
        icon: <Image />, 
        name: 'Background', 
        next: <Background />
    },
    // { 
    //     key: 'upgrade',
    //     icon: <RefreshCw />, 
    //     name: 'Upgrade', 
    //     next: <Secrets />
    // },
    { 
        key: 'about',
        icon: <Info />, 
        name: 'About', 
        next: <About />
    },
];

export default settingsNavRoutes;