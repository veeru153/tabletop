import React from 'react';
import styles from './AddWidgetPanel.module.css';
import MyInput from '../UI/MyInput';
import { Formik } from 'formik';

const AddWeather = () => {
    const key = localStorage.getItem('opmKey');

    return (
        <Formik
            initialValues={{ city: '', key: key ?? '' }}
            onSubmit={(values, actions) => {
                console.log(values);
                if(!key) {
                    localStorage.setItem('opmKey', values.key);
                }
            }}
        >
            {(props) => (
            <form className={styles.AddWidgetPanel} onSubmit={props.handleSubmit}>
                <h1>Add Widget: Weather</h1>
                <MyInput 
                    label="City" 
                    value={props.values.city}
                    onChange={props.handleChange('city')}
                    config={{ required: true }}
                />
                <MyInput 
                    label="OpenWeatherMaps Key" 
                    value={props.values.key}
                    onChange={props.handleChange('key')}
                    config={{
                        type: "password",
                        required: true,
                    }}
                    inputProps={{
                        readOnly: key == null ? true : false,
                    }}
                />
                <p></p>
                <button className={styles.addBtn} type="submit">ADD</button>
            </form>
            )}
        </Formik>
    )
}

export default AddWeather;