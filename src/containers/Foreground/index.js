import React from 'react';
import classes from './Foreground.module.scss';
import Settings from './Settings';
import AddWidget from './AddWidget';
import ModifyWidget from './ModifyWidget';

// Handles all UI elements that need to be displayed on top
// E.g: Settings, Menu Buttons, etc.
const Foreground = ({ showSettings, setShowSettings, showAddWidget, setShowAddWidget, modifyWidget, setModifyWidget }) => {
    const isForegroundNeeded = (showSettings || showAddWidget || modifyWidget);

    return (
        <div 
            className={classes.Foreground}
            style={{ transform: isForegroundNeeded ? "translateY(0)" : "translateY(100%)" }}
        >
            {showSettings && <Settings showSettings={showSettings} setShowSettings={setShowSettings} />}
            {showAddWidget && <AddWidget showAddWidget={showAddWidget} setShowAddWidget={setShowAddWidget} />}
            {modifyWidget && <ModifyWidget modifyWidget={modifyWidget} setModifyWidget={setModifyWidget} />}
        </div>
    )
}

export default Foreground;