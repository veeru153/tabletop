import React, { useState } from 'react';
import classes from './Dashboard.module.scss';
import { MenuRounded } from '@material-ui/icons';
import WidgetRenderer from '../../common/util/WidgetRenderer';
import Settings from './Settings';

// Handles widget placement
const Dashboard = ({ widgets }) => {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className={classes.Dashboard}>
            {widgets.map(w => <WidgetRenderer key={w.key} w={w} />)}
            <MenuBtn onClick={() => setShowSettings(true)} />
            <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
        </div>
    )
}

const MenuBtn = ({ onClick }) => (
    <button className={classes.menuBtn} onClick={onClick}>
        <MenuRounded style={styles.menuBtn} />
    </button>
)

const styles = {
    menuBtn: {
        fontSize: 46, 
        color: '#dedede',
    }
}

export default Dashboard;