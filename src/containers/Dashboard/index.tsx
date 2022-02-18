import { useContext } from 'react';
import classes from './Dashboard.module.scss';
import WidgetRenderer from '../../common/util/WidgetRenderer';
import { ConfigContext } from '../../common/util/contexts';
import Toolbar from './Toolbar';

// Handles widget placement
const Dashboard = ({ widgets, setShowSettings, setShowAddWidget, filter, showZeroWidgetMsg, hideZeroWidgetMsg }) => {
    const { editMode, setEditMode } = useContext(ConfigContext);
    const toolbarProps = { setShowSettings, setShowAddWidget, editMode, setEditMode };
    const filterS = filter.fn === "none" ? filter.fn : `${filter.fn}(${filter.value})`;

    const dashStyles = {
        backdropFilter: filterS,
        display: (widgets.length < 1) ? 'flex' : 'block',
    }

    return (
        <div className={classes.Dashboard} style={dashStyles}>
            {widgets && widgets.map(w => <WidgetRenderer key={w.key} w={w} />)}
            <Toolbar {...toolbarProps} />
            {(showZeroWidgetMsg && widgets.length < 1) && <ZeroWidgetMsg hideZeroWidgetMsg={hideZeroWidgetMsg} />}
        </div>
    )
}

const ZeroWidgetMsg = ({ hideZeroWidgetMsg }) => {
    return (
        <div className={classes.zeroWidgetMessage}>
            <h1>Welcome to TableTop!</h1>
            <h3>
                Seems quite empty, doesn't it?<br />
                Add Widgets by Clicking on the Menu button below.<br />
                Click <span onClick={hideZeroWidgetMsg}>here</span> to get rid of this message.
            </h3>
        </div>
    )
}

export default Dashboard;