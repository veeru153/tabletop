import React, { useContext } from 'react';
import { Formik } from 'formik';
import { ConfigContext } from '../util/contexts';
import FormTemplate from '../containers/Settings/FormTemplate';
// import { WIDGET } from '../widgets';

/** Instructions on use:
 * 1. DO NOT USE NewWidgetForm DIRECTLY! Make a copy of NewWidgetForm and edit that.
 * 2. Import your Widget. The import has already been added above. Uncomment to use.
 * 3. Import your form in ./index.js and follow the instructions there.
 * 4. Complete the form component below.
 * 5. Remove all template comments from your WidgetForm before sending PR.
 */

const NewWidgetForm = () => {
    const { addWidget } = useContext(ConfigContext);

    return (
        <Formik
            initialValues={{ city: '' }}
            onSubmit={(values, actions) => {
                /**
                 * Add code to be performed when form is submitted. 
                 * Change WIDGET to the WIDGET you import.
                 */
                // addWidget(WIDGET.type, values);
                actions.resetForm();
            }}
        >
            {(props) => (
                <FormTemplate
                    // Change WIDGET_NAME to your WIDGET's Name
                    title="Add Widget : WIDGET_NAME"
                    // Subtitle is optional.
                    // subtitle=""
                >
                    <form onSubmit={props.handleSubmit}>
                        {/* Add form content here */}
                        <button type="submit" disabled={props.isSubmitting}>Submit</button>
                    </form>
                </FormTemplate>
            )}
        </Formik>
    )
}

export default NewWidgetForm;