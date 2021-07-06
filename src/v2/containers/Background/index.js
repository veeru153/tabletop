import React, { useState, useEffect } from 'react';
import classes from './Background.module.scss';
import Images from './Images';
import Video from './Video';

// Handles background images and videos provided by the user
const Background = ({ bg }) => {
    return (
        <div className={classes.Background}>
            <Images />
            {/* <Video /> */}
        </div>
    )
}

export default Background;