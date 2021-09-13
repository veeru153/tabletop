import React from 'react';
import classes from './Foreground.module.scss';
import Cover from './Cover';
import Settings from './Settings';
import AddWidget from './AddWidget';

// Handles all UI elements that need to be displayed on top
// E.g: Settings, Menu Buttons, etc.
const Foreground = ({ showSettings, setShowSettings, showAddWidget, setShowAddWidget }) => {
    const isForegroundNeeded = (showSettings || showAddWidget);

    return (
        <div 
            className={classes.Foreground}
            style={{ transform: isForegroundNeeded ? "translateY(0)" : "translateY(100%)" }}
        >
            {showSettings && <Settings showSettings={showSettings} setShowSettings={setShowSettings} />}
            {showAddWidget && <AddWidget showAddWidget={showAddWidget} setShowAddWidget={setShowAddWidget} />}
            {/* <Cover /> */}
        </div>
    )
}

const styles = {
    menuBtn: {
        fontSize: 46, 
        color: '#dedede',
    }
}

export default Foreground;