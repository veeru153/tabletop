import { PlusSquare, Trash2, Wrench, Key, Info, Image } from 'lucide-react';
import Configure from './Configure';
import Background from './Background';
import Secrets from './Secrets';
import About from './About';

const settingsNavRoutes = [
    { 
        id: 'config',
        icon: <Wrench />, 
        name: 'Configure', 
        next: <Configure />
    },
    { 
        id: 'background',
        icon: <Image />, 
        name: 'Background', 
        next: <Background />
    },
    { 
        id: 'secrets',
        icon: <Key />, 
        name: 'Secrets', 
        next: <Secrets />
    },
    { 
        id: 'about',
        icon: <Info />, 
        name: 'About', 
        next: <About />
    },
];

export default settingsNavRoutes;