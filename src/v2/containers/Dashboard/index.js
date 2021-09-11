import React, { useContext } from 'react';
import classes from './Dashboard.module.scss';
import WidgetRenderer from '../../common/util/WidgetRenderer';
import { ConfigContext } from '../../common/util/contexts';
import Toolbar from './Toolbar';

// Handles widget placement
const Dashboard = ({ widgets, setShowSettings, setShowAddWidget, filter }) => {
    const { editMode, setEditMode } = useContext(ConfigContext);
    const toolbarProps = { setShowSettings, setShowAddWidget, editMode, setEditMode };
    const filterS = filter.fn === "none" ? filter.fn : `${filter.fn}(${filter.value})`;

    return (
        <div className={classes.Dashboard} style={{ backdropFilter: filterS }}>
            {widgets && widgets.map(w => <WidgetRenderer key={w.key} w={w} />)}
            <Toolbar {...toolbarProps} />
        </div>
    )
}

export default Dashboard;