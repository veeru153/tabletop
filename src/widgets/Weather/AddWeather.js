import React, { useContext } from 'react';
import { WEATHER } from '../../util/widgetRegistry';
import { ConfigContext } from '../../util/contexts';
import { Formik } from 'formik';
import FormTemplate from '../../containers/Settings/FormTemplate';

const AddWeather = () => {
    const { addWidget } = useContext(ConfigContext);

    return (
        <Formik
            initialValues={{ city: '' }}
            onSubmit={(values, actions) => {
                addWidget(WEATHER.type, values);
                actions.resetForm();
            }}
        >
            {(props) => (
                <FormTemplate
                    title="Add Widget : Weather"
                    subtitle="Make sure you have your OpenWeatherMaps API Key in 'Secrets'!"
                >
                    <form onSubmit={props.handleSubmit}>
                        <input 
                            name="city"
                            type="text"
                            placeholder="City, [Country Code]"
                            onChange={props.handleChange}
                            value={props.values.city}
                        />
                        <button type="submit" disabled={props.isSubmitting}>Submit</button>
                    </form>
                </FormTemplate>
            )}
        </Formik>
    )
}

export default AddWeather;