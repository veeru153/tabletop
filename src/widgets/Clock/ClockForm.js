import React, { useContext } from 'react';
import { ConfigContext, NavContext } from '../../common/util/contexts';
import { Formik } from 'formik';
import { TextInput, Dropdown, Button, Page, Radio } from '../../common/ui';
import widget from './';

const ClockForm = () => {
    const { addWidget } = useContext(ConfigContext);
    const { close } = useContext(NavContext);
    const values = {
        digital: true,
        military: true,
        tz: "",
        label: "",
    }

    return (
        <Formik
            initialValues={values}
            onSubmit={(values, actions) => {
                if (values.tz === "Select a Timezone") return;
                addWidget(widget.type, values);
                close();
                actions.resetForm();
            }}
        >
            {(props) => (
                <Page
                    title="Add Widget : Clock"
                    subtitle="It's about time! Note: You'll have to change the time for DST."
                >
                    <form onSubmit={props.handleSubmit} style={styles.form}>
                        <div style={styles.formRow}>
                            <h3>Type:</h3>
                            <Radio
                                label="Digital"
                                name="digital"
                                value="true"
                                checked={props.values.digital}
                                onChange={() => props.setFieldValue('digital', true)}
                                style={styles.radioBtn}
                            />
                            <Radio
                                label="Analog"
                                name="analog"
                                value="false"
                                checked={!props.values.digital}
                                onChange={() => props.setFieldValue('digital', false)}
                                style={styles.radioBtn}
                            />
                        </div>
                        {props.values.digital && <div style={styles.formRow}>
                            <h3>Format:</h3>
                            <Radio
                                label="24-Hour"
                                name="24"
                                value="true"
                                checked={props.values.military}
                                onChange={() => props.setFieldValue('military', true)}
                                style={styles.radioBtn}
                            />
                            <Radio
                                label="12-Hour"
                                name="12"
                                value="false"
                                checked={!props.values.military}
                                onChange={() => props.setFieldValue('military', false)}
                                style={styles.radioBtn}
                            />
                        </div>}
                        <Dropdown
                            name="tz"
                            onChange={(e) => props.setFieldValue("tz", e.target.value)}
                            options={tzOffsets}
                        />
                        <TextInput
                            name="label"
                            placeholder="Clock Label (Optional)"
                            onChange={props.handleChange}
                            value={props.values.label}
                            style={styles.input}
                        />
                        <Button 
                            type="submit" 
                            disabled={["", "Select a Timezone"].includes(props.values.tz) || props.isSubmitting}
                            style={styles.btn}
                        >Submit</Button>
                    </form>
                </Page>
            )}
        </Formik>
    )
}

const tzOffsets = [
    "Select a Timezone",
    "UTC-12:00",
    "UTC-11:00",
    "UTC-10:00",
    "UTC-09:30",
    "UTC-09:00",
    "UTC-08:00",
    "UTC-07:00",
    "UTC-06:00",
    "UTC-05:00",
    "UTC-04:00",
    "UTC-03:30",
    "UTC-03:00",
    "UTC-02:00",
    "UTC-01:00",
    "UTC+00:00",
    "UTC+01:00",
    "UTC+02:00",
    "UTC+03:00",
    "UTC+03:30",
    "UTC+04:00",
    "UTC+04:30",
    "UTC+05:00",
    "UTC+05:30",
    "UTC+05:45",
    "UTC+06:00",
    "UTC+06:30",
    "UTC+07:00",
    "UTC+08:00",
    "UTC+08:45",
    "UTC+09:00",
    "UTC+09:30",
    "UTC+10:00",
    "UTC+10:30",
    "UTC+11:00",
    "UTC+12:00",
    "UTC+12:45",
    "UTC+13:00",
    "UTC+14:00"
]

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
    },
    input: {
        fontSize: '30px',
        textAlign: 'center',
    },
    btn: {
        margin: '64px auto',
    },
    formRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    radioBtn: {
        fontSize: '18.72px',
    },
    dropdown: {
        margin: '18px auto',
    }
}

export default ClockForm;