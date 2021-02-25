import React from 'react';
import classes from '../Settings.module.css';
import Option from '../Option';
import * as widgetForms from '../../../widgetForms';

const AddWidgetForm = () => {
    const formList = Object.values(widgetForms);
    return (
        <div className={classes.Settings}>
        <header>
            <h1>Add Widget</h1>
            <h3>Choose a Widget:</h3>
        </header>
        <section>
            {formList.map(form => <Option key={form.key} opt={form} style={{ height: 247.03 }} />)}
        </section>
    </div>
    )
}

export default AddWidgetForm;