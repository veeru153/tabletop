import React from 'react';
import styles from './AddWidgetPanel.module.css';
import MyInput from '../UI/MyInput';
import { Formik } from 'formik';

const AddClock = () => {
    return (
        <Formik
            initialValues={{ label: '', tz: '' }}
            onSubmit={(values, actions) => {
                console.log(values);
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
    )
}

export default AddClock;