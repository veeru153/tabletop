import React, { useContext } from 'react';
import classes from './Dashboard.module.scss';
import WidgetRenderer from '../../common/util/WidgetRenderer';
import { ConfigContext } from '../../common/util/contexts';
import Toolbar from './Toolbar';

// Handles widget placement
const Dashboard = ({ widgets, setShowSettings, setShowAddWidget }) => {
    const { editMode, setEditMode } = useContext(ConfigContext);
    const toolbarProps = { setShowSettings, setShowAddWidget, editMode, setEditMode };

    return (
        <div className={classes.Dashboard}>
            {widgets && widgets.map(w => <WidgetRenderer key={w.key} w={w} />)}
            <Toolbar {...toolbarProps} />
        </div>
    )
}

export default Dashboard;