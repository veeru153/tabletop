import React from 'react';
import classes from './Foreground.module.scss';
import { MenuRounded } from '@material-ui/icons';
import Cover from './Cover';
import Settings from './Settings';

// Handles all UI elements that need to be displayed on top
// E.g: Settings, Menu Buttons, etc.
const Foreground = () => {
    return (
        <div className={classes.Foreground}>
            <button className={classes.menuBtn}>
                <MenuRounded style={styles.menuBtn} />
            </button>
            <Settings />
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