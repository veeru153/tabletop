import React, { useContext } from 'react';
import { CLOCK } from '../../util/widgetRegistry';
import { ConfigContext } from '../../util/contexts';
import { Formik } from 'formik';
import FormTemplate from '../../containers/Settings/FormTemplate';

const AddClock = () => {
    const { addWidget } = useContext(ConfigContext);

    return (
        <Formik
            initialValues={{ tz: "UTC-12:00", label: "" }}
            onSubmit={(values, actions) => {
                addWidget(CLOCK.type, values);
                actions.resetForm();
            }}
        >
            {(props) => (
                <FormTemplate
                    title="Add Widget : Clock"
                    subtitle="It's about time!"
                >
                    <form onSubmit={props.handleSubmit}>
                        <select 
                            name="tz" 
                            id="tz"
                            onChange={(e) => props.setFieldValue("tz", e.target.value)}
                        >
                            {tzOffsets.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                        </select>
                        <input
                            name="label"
                            type="text"
                            placeholder="Clock Label"
                            onChange={props.handleChange}
                            value={props.values.label}
                        />
                        <button type="submit" disabled={props.isSubmitting}>Submit</button>
                    </form>
                </FormTemplate>
            )}
        </Formik>
    )
}

const tzOffsets = [
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

export default AddClock;