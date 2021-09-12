import React, { useContext } from 'react';
import { Formik } from 'formik';
import { ConfigContext, NavContext } from '../../common/util/contexts';
import { Radio, Button, Page } from '../../common/ui';
import widget from './';

const CalendarForm = () => {
    const { addWidget } = useContext(ConfigContext);
    const { close } = useContext(NavContext);

    return (
        <Formik
            initialValues={{ startsMonday: true, daily: true }}
            onSubmit={(values, actions) => {
                addWidget(widget.type, values);
                close();
                actions.resetForm();
            }}
        >
            {(props) => (
                <Page
                    title="Add Widget : Calendar"
                    subtitle="Don't get outdated ;)"
                >
                    <form onSubmit={props.handleSubmit} style={styles.form}>
                        <div style={styles.formRow}>
                            <h3>Type:</h3>
                            <Radio
                                label="Daily"
                                name="daily"
                                value={props.values.daily}
                                checked={props.values.daily}
                                onChange={() => props.setFieldValue('daily', true)}
                                style={styles.radioBtn}
                            />
                            <Radio
                                label="Monthly"
                                name="monthly"
                                value={!props.values.daily}
                                checked={!props.values.daily}
                                onChange={() => props.setFieldValue('daily', false)}
                                style={styles.radioBtn}
                            />
                        </div>
                        <div style={{ ...styles.formRow, visibility: props.values.daily ? "hidden" : "visible" }}>
                            <h3>First Day of the Week:</h3>
                            <Radio
                                label="Monday"
                                name="monday"
                                value={props.values.startsMonday}
                                checked={props.values.startsMonday}
                                onChange={() => props.setFieldValue('startsMonday', true)}
                                style={{ ...styles.radioBtn, display: props.values.daily ? "none" : "block" }}
                                // Need to hide radio btns - parent visibilty delays hiding - 
                                // reason unknown.
                            />
                            <Radio
                                label="Sunday"
                                name="sunday"
                                value={!props.values.startsMonday}
                                checked={!props.values.startsMonday}
                                onChange={() => props.setFieldValue('startsMonday', false)}
                                style={{ ...styles.radioBtn, display: props.values.daily ? "none" : "block" }}
                            />
                        </div>
                        <Button 
                            type="submit" 
                            disabled={props.isSubmitting}
                            style={styles.btn}
                        >Submit</Button>
                    </form>
                </Page>
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
    formRow: {
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