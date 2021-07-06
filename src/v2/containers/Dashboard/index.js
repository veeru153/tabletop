import React, { useState } from 'react';
import classes from './Dashboard.module.scss';
import WidgetRenderer from '../../common/util/WidgetRenderer';
import Toolbar from './Toolbar';

// Handles widget placement
const Dashboard = ({ widgets, setShowSettings, setShowAddWidget }) => {
    const toolbarProps = { setShowSettings, setShowAddWidget };

    return (
        <div className={classes.Dashboard}>
            {widgets.map(w => <WidgetRenderer key={w.key} w={w} />)}
            <Toolbar {...toolbarProps} />
        </div>
    )
}

export default Dashboard;