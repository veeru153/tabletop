import React, { useContext } from 'react';
import { WEATHER } from '../../util/widgetTypes';
import { ConfigContext } from '../../util/contexts';
import { Formik } from 'formik';
import FormTemplate from '../../containers/Settings/FormTemplate';

const AddWeather = () => {
    const { addWidget } = useContext(ConfigContext);

    return (
        <Formik
            initialValues={{ city: '' }}
            onSubmit={(values, actions) => {
                addWidget(WEATHER, values);
                actions.resetForm();
            }}
        >
            {(props) => (
                <FormTemplate
                    title="Add Weather Widget"
                    subtitle="Make sure you have your OpenWeatherMaps API Key in 'Secrets'!"
                >
                    <form onSubmit={props.handleSubmit}>
                        <input 
                            name="city"
                            type="text"
                            placeholder="City, [Country Code]"
                            onChange={props.handleChange}
                            value={props.values.q}
                        />
                        <button type="submit" disabled={props.isSubmitting}>Submit</button>
                    </form>
                </FormTemplate>
            )}
        </Formik>
    )
}

export default AddWeather;