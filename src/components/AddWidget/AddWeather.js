import React from 'react';
import styles from './AddWidgetPanel.module.css';
import MyInput from '../UI/MyInput';
import { Formik } from 'formik';
import { WidgetConsumer } from '../Dashboard/contexts';
import { WeatherSmall } from '../Widget/wKey';

const AddWeather = () => {
    const key = localStorage.getItem('opmKey');

    return (
        <WidgetConsumer>
            {(addWidget) => (
                <Formik
                    initialValues={{ city: '', key: key ?? '' }}
                    onSubmit={(values, actions) => {
                        if (!key) {
                            localStorage.setItem('opmKey', values.key);
                        }
                        addWidget(WeatherSmall, values.city);
                        actions.resetForm();
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
                                    readOnly: props.values.key === '' ? false : true,
                                }}
                            />
                            <p></p>
                            <button className={styles.addBtn} type="submit">ADD</button>
                        </form>
                    )}
                </Formik>
            )}
        </WidgetConsumer>
    )
}

export default AddWeather;