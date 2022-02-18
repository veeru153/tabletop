import { useContext } from 'react';
import classes from './Settings.module.scss';
import PageShell from '../PageShell';
import { Page, Option } from '../../../common/ui';
import { NavContext } from '../../../common/util/contexts';
import navRoutes from './pages';

// Container for all Settings and config pages
const Settings = ({ showSettings, setShowSettings }) => {
    return (
        <PageShell visibility={showSettings} setVisibility={setShowSettings}>
            <RootSettings />
        </PageShell>
    )
}

const RootSettings = () => {
    const { open } = useContext(NavContext);

    return (
        <Page 
            title="Settings" 
            subtitle="Control and Customise your Dashboard!"
            className={classes.RootSettings}
        >
            {navRoutes.map(r => (
                <Option 
                    key={r.key} 
                    name={r.name} 
                    icon={r.icon} 
                    next={() => open(r.next)} 
                />))}
        </Page>
    )
}

export default Settings;