import { useContext } from 'react';
import { NavContext } from '../../common/util/contexts';
import { withFormUtils } from '../../common/hoc';
import widget from '.';
// ^^^^^ Required Imports ^^^^^^
import { Formik } from 'formik';                        // Form management library
import { Button, Page } from '../../common/ui';         // TableTop UI components
import { WidgetFormProps } from '../../common/util/types';

/** Instructions on use:
 * 1. DO NOT USE NewWidget DIRECTLY! Make a copy of NewWidget and edit that.
 * 2. Rename this file to <WIDGET_NAME>Form.js and the component to <WIDGET_NAME>Form.
 * 3. Complete the form component below.
 * 4. Import your form in accompanying ./index.js and follow the instructions there.
 * 5. Remove all template comments from NewWidget before sending PR.
 */

const NewWidgetForm = (props: WidgetFormProps) => {
    const { close } = useContext(NavContext);           // Closes page

    const values = { 
        // Form details needed. Leave empty if no values needed.
    }

    return (
        <Formik
            initialValues={values}
            onSubmit={(values, actions) => {
                // Perform any action before form submission.

                props.addWidget(widget.type, values);
                close()
                actions.resetForm();
            }}
        >
            {(props) => (
                <Page
                    title="Add Widget : {NEW_WIDGET}"
                    subtitle="{INFORMATION_SHORT}"
                >
                    <form onSubmit={props.handleSubmit} style={styles.form}>
                        {/* Add Form elements here */}
                        <Button type="submit">Submit</Button>
                    </form>
                </Page>
            )}
        </Formik>
    )
}

const styles : Record<string, React.CSSProperties> = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
    },
}

export default withFormUtils(NewWidgetForm);