import React from 'react';
import classes from './Cover.module.scss';

const Cover = ({ showCover, coverMsg, bgColor = "#282c34" }) => {
    return (
        <div 
            className={classes.Cover}
            style={{ 
                transform: `translateY(${showCover ? 0 : -100}%)`,
                backgroundColor: bgColor,
            }}
        >
            <h1>TableTop</h1>
            {coverMsg && <h3>{coverMsg}</h3>}
        </div>
    )
}

export default Cover;