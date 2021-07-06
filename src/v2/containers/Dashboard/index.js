import React, { useState } from 'react';
import classes from './Dashboard.module.scss';
import { MenuRounded } from '@material-ui/icons';
import WidgetRenderer from '../../common/util/WidgetRenderer';
import Toolbar from './Toolbar';
import Settings from './Settings';

// Handles widget placement
const Dashboard = ({ widgets, setShowSettings }) => {
    const toolbarProps = { setShowSettings };

    return (
        <div className={classes.Dashboard}>
            {widgets.map(w => <WidgetRenderer key={w.key} w={w} />)}
            <Toolbar {...toolbarProps} />
        </div>
    )
}

export default Dashboard;