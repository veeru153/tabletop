import React, { useState, useEffect } from 'react';
import classes from './Background.module.scss';
import Images from './Images';
import Video from './Video';

// Handles background images and videos provided by the user
const Background = ({ bg }) => {
    return (
        <div className={classes.Background}>
            {bg.type !== 0 ? (bg.type === 1 ? <Images blend={bg.blend} /> : <Video />) : <div></div>}
        </div>
    )
}

export default Background;