import React, { useState, useEffect } from 'react';
import classes from './Background.module.scss';
import Images from './Images';

// Handles background images and videos provided by the user
const Background = () => {
    return (
        <div className={classes.Background}>
            <Images />
        </div>
    )
}

export default Background;