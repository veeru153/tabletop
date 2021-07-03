import React, { useState, useEffect } from 'react';
import classes from './Page.module.scss';

// Container for all Settings and config pages
const Page = ({ title, subtitle, children, className: userClasses, style: userStyles}) => {
    return (
        <div className={classes.Page}>
            <header>
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
            </header>
            <section className={userClasses} style={userStyles}>
                {children}
            </section>
        </div>
    )
}

export default Page;