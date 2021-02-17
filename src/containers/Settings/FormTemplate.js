import React from 'react';
import classes from './FormTemplate.module.css';

const FormTemplate = (props) => {
    const { title, subtitle, className : userClasses } = props;
    return (
        <div className={classes.FormTemplate}>
            <header>
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
            </header>
            <section className={userClasses}>
                {props.children}
            </section>
        </div>
    )
}

export default FormTemplate;