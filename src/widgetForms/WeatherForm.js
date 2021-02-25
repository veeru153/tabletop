import React, { useContext } from 'react';
import { WEATHER } from '../widgets';
import { ConfigContext } from '../util/contexts';
import { Formik } from 'formik';
import FormTemplate from '../containers/Settings/FormTemplate';
import { TextInput, Button } from '../ui';

// TODO: Add an warning message that OWM Key has not been set.

const WeatherForm = () => {
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
                    <form onSubmit={props.handleSubmit} style={styles.form}>
                        <TextInput 
                            name="city"
                            placeholder="City, Country Code"
                            onChange={props.handleChange}
                            value={props.values.city}
                            style={styles.input}
                        />
                        <Button 
                            type="submit" 
                            disabled={!props.values.city || props.isSubmitting}
                            style={styles.btn}
                        >Submit</Button>
                    </form>
                </FormTemplate>
            )}
        </Formik>
    )
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 'clamp(124px, 50%, 152px)',
        alignItems: 'center',
        height: '100%',
    },
    input: {
        margin: '60px auto',
        fontSize: '30px',
        textAlign: 'center',
    },
    btn: {
        margin: '36px auto',
    }
}

export default WeatherForm;