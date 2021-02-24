import React from 'react';
import classes from './TableTop.module.css';
import Dashboard from './Dashboard';

const Intro = (props) => {
    
    return (
        <>
            <div 
                className={classes.Intro} 
                style={{ transform: props.loaded ? 'translateY(-100%)' : 'translateY(0)' }}
            >
                <h1>TableTop</h1>
            </div>
            <Dashboard />
        </>
    )
}

export default Intro;