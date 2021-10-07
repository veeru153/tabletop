import React from 'react';
import classes from './Background.module.scss';

const VideoPicker = () => {
    return (
        <div className={classes.videoPicker}>
            <span style={{ fontSize: 16 }}>Only available in the extension.</span>
        </div>
    )
}

export default VideoPicker;