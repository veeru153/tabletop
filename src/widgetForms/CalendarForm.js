import React, { useContext } from 'react';
import { Formik } from 'formik';
import { ConfigContext } from '../util/contexts';
import FormTemplate from '../containers/Settings/FormTemplate';
import { Radio, Button } from '../ui';
import { CALENDAR } from '../widgets';

const CalendarForm = () => {
    const { addWidget } = useContext(ConfigContext);

    return (
        <Formik
            initialValues={{ startsMonday: true }}
            onSubmit={(values, actions) => {
                addWidget(CALENDAR.type, values);
                actions.resetForm();
            }}
        >
            {(props) => (
                <FormTemplate
                    title="Add Widget : Calendar"
                    subtitle="Don't get outdated ;)"
                >
                    <form onSubmit={props.handleSubmit} style={styles.form}>
                        <div style={styles.container}>
                            <h3>First Day of the Week:</h3>
                            <Radio
                                label="Monday"
                                name="monday"
                                value={props.values.startsMonday}
                                checked={props.values.startsMonday}
                                onChange={() => props.setFieldValue('startsMonday', true)}
                                style={styles.radioBtn}
                            />
                            <Radio
                                label="Sunday"
                                name="sunday"
                                value={!props.values.startsMonday}
                                checked={!props.values.startsMonday}
                                onChange={() => props.setFieldValue('startsMonday', false)}
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