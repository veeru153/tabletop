import React from 'react';
import classes from './FormTemplate.module.css';

const FormTemplate = (props) => {
    const { title, subtitle, className : userClasses, formClasses } = props;
    return (
        <div className={[classes.FormTemplate, formClasses].join(" ")}>
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