import React, { useState, useEffect } from 'react';
import classes from './Settings.module.scss';
import { ArrowUpwardRounded, CloseRounded } from '@material-ui/icons';
import RootSettings from './pages/RootSettings';

// Container for all Settings and config pages
const Settings = () => {
    const [pageStack, setPageStack] = useState([]);
    const level = pageStack.length;
    const showSettings = (level === 0);

    const LeftSide = () => (
        <div
            className={classes.sides}
            style={{ justifyContent: 'flex-end' }}
        >
            <button
                className={classes.uiBtns}
                style={{ margin: '0 20px', display: (level === 0) ? 'none' : 'block' }}
            // onClick={upOneLevel}
            >
                <ArrowUpwardRounded style={styles.uiBtns} />
            </button>
        </div>
    )

    const RightSide = () => (
        <div className={classes.sides}>
            <button
                className={classes.uiBtns}
            // onClick={() => setShowSettings(false)}
            >
                <CloseRounded style={styles.uiBtns} />
            </button>
        </div>
    )

    return (
        <div className={classes.Settings}>
            <LeftSide />
            <RootSettings />
            <RightSide />
        </div>
    )
}

const styles = {
    uiBtns: {
        fontSize: 46,
        color: '#dedede',
    }
}

export default Settings;