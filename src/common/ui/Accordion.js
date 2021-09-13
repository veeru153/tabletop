import React, { useState } from 'react';
import classes from './Accordion.module.scss';
import { ChevronUp, ChevronDown } from 'react-feather';

const Accordion = ({ title, children, className : userClasses, style : userStyles }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={classes.Accordion}>
            <div className={classes.header} onClick={() => setExpanded(!expanded)}>
                <h2>{title}</h2>
                {expanded ? <ChevronUp /> : <ChevronDown />}
            </div>
            <div 
                className={`${classes.content} ${userClasses}`}
                style={{ ...userStyles, display: expanded ? 'block' : 'none' }}
            >
                {children}
            </div>
            <hr />
        </div>
    )
}

export default Accordion;