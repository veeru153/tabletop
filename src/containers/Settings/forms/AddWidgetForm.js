import React from 'react';
import classes from './Form.module.css';
import FormTemplate from '../FormTemplate.js'
import Option from '../Option';
import * as widgetForms from '../../../widgetForms';

const AddWidgetForm = () => {
    const formList = Object.values(widgetForms);
    return (
        <FormTemplate
            title="Add Widget"
            subtitle="Choose a Widget:"
            formClasses={classes.Form}
        >
            {formList.map(form => <Option key={form.key} opt={form} />)}
        </FormTemplate>
    )
}

export default AddWidgetForm;