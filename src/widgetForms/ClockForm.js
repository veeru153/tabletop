import React, { useContext } from 'react';
import { CLOCK } from '../widgets';
import { ConfigContext } from '../util/contexts';
import { Formik } from 'formik';
import FormTemplate from '../containers/Settings/FormTemplate';
import { TextInput, Dropdown, Button } from '../ui';

const ClockForm = () => {
    const { addWidget } = useContext(ConfigContext);

    return (
        <Formik
            initialValues={{ tz: "", label: "" }}
            onSubmit={(values, actions) => {
                if (values.tz === "Select a Timezone") return;
                addWidget(CLOCK.type, values);
                actions.resetForm();
            }}
        >
            {(props) => (
                <FormTemplate
                    title="Add Widget : Clock"
                    subtitle="It's about time! Note: You'll have to change the time for DST."
                >
                    <form onSubmit={props.handleSubmit} style={styles.form}>
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
                </FormTemplate>
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
        marginTop: '24%',
        alignItems: 'center',
        height: '100%',
    },
    input: {
        margin: '60px auto',
        fontSize: '30px',
        textAlign: 'center',
    },
    btn: {
        margin: '64px auto',
    }
}

export default ClockForm;