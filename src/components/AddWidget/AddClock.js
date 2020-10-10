import React from 'react';
import styles from './AddWidgetPanel.module.css';
import MyInput from '../UI/MyInput';
import { Formik } from 'formik';
import { WidgetConsumer } from '../Dashboard/contexts';
import { Clock } from '../Widget/wKey';

const AddClock = () => {
    return (
        <WidgetConsumer>
            {(addWidget) => (
                <Formik
                    initialValues={{ label: '', tz: '' }}
                    onSubmit={(values, actions) => {
                        addWidget(Clock, [values.label, values.tz]);
                        actions.resetForm();
                    }}
                >
                    {(props) => (
                        <form className={styles.AddWidgetPanel} onSubmit={props.handleSubmit}>
                            <h1>Add Widget: Clock</h1>
                            <MyInput
                                label="Label"
                                value={props.values.label}
                                onChange={props.handleChange('label')}
                            />
                            <MyInput
                                label="Timezone"
                                value={props.values.tz}
                                onChange={props.handleChange('tz')}
                                config={{ required: true }}
                            />
                            <button className={styles.addBtn} type="submit">ADD</button>
                        </form>
                    )}
                </Formik>
            )}
        </WidgetConsumer>
    )
}

export default AddClock;