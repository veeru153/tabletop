import React, { useContext } from 'react';
import { Formik } from 'formik';
import { ConfigContext } from '../util/contexts';
import FormTemplate from '../containers/Settings/FormTemplate';
import { Radio, Button } from '../ui';
// import { WIDGET } from '../widgets';

/** Instructions on use:
 * 1. DO NOT USE NewWidgetForm DIRECTLY! Make a copy of NewWidgetForm and edit that.
 * 2. Import your Widget. The import has already been added above. Uncomment to use.
 * 3. Import your form in ./index.js and follow the instructions there.
 * 4. Complete the form component below.
 * 5. Remove all template comments from your WidgetForm before sending PR.
 */

const CalendarForm = () => {
    const { addWidget } = useContext(ConfigContext);

    return (
        <Formik
            initialValues={{ firstWeekDay: "monday" }}
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
                    title="Add Widget : Calendar"
                    subtitle="Don't get outdated ;)"
                >
                    <form onSubmit={props.handleSubmit} style={styles.form}>
                        {/* Add form content here */}
                        <div style={styles.container}>
                            <h3>First Day of the Week:</h3>
                            <Radio
                                label="Monday"
                                name="monday"
                                value="monday"
                                checked={props.values.firstWeekDay === "monday"}
                                onChange={() => props.setFieldValue('firstWeekDay', "monday")}
                                style={styles.radioBtn}
                            />
                            <Radio
                                label="Sunday"
                                name="sunday"
                                value="sunday"
                                checked={props.values.firstWeekDay === "sunday"}
                                onChange={() => props.setFieldValue('firstWeekDay', "sunday")}
                                style={styles.radioBtn}
                            />
                        </div>
                        <Button 
                            type="submit" 
                            disabled={props.isSubmitting}
                            style={styles.btn}
                        >Submit</Button>
                    </form>
                </FormTemplate>
            )}
        </Formik>
    )
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 50,
    },
    radioBtn: {
        fontSize: '18.72px',
    },
    btn: {
        margin: '100px auto',
    },
}

export default CalendarForm;