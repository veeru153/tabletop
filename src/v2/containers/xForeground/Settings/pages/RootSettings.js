import React, { useContext } from 'react';
// import Page from '../PageTemplate';
import Page from '../../../../common/ui/PageTemplate';
import Option from '../../../../common/ui/PageOption';
import classes from '../Settings.module.scss';
import { PlusSquare, Trash2, Settings, Key, Info } from 'react-feather';
import { Wallpaper } from '@material-ui/icons';
import { NavContext } from '../../../../common/util/contexts';
import AddWidget from './AddWidget';
import About from './About';

const RootSettings = () => {
    const { open } = useContext(NavContext);

    return (
        <Page 
            title="Settings" 
            subtitle="Control and Customise your Dashboard!"
            className={classes.RootSettings}
        >
            {rootNavRoutes.map(r => (
                <Option 
                    key={r.key} 
                    name={r.name} 
                    icon={r.icon} 
                    next={() => open(r.next)} 
                />))}
        </Page>
    )
}

const rootNavRoutes = [
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
        // next: <SecretsForm />
    },
    { 
        key: 'about',
        icon: <Info />, 
        name: 'About', 
        next: <About />
    },
];

export default RootSettings;