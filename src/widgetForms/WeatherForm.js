import React, { useState, useEffect, useContext } from 'react';
import { WEATHER } from '../widgets';
import { ConfigContext } from '../util/contexts';
import { Formik } from 'formik';
import FormTemplate from '../containers/Settings/FormTemplate';
import { TextInput, Button } from '../ui';
import { cookies, SECRETS } from '../util/cookies';

// TODO: Add an warning message that OWM Key has not been set.

const WeatherForm = () => {
    const { addWidget } = useContext(ConfigContext);
    const [apiKeyExists, setApiKeyExists] = useState(false);

    useEffect(() => {
        async function doesApiKeyExist() {
            const { owmKey } = await cookies.get(SECRETS);
            setApiKeyExists(owmKey && owmKey?.token);
        }
        doesApiKeyExist();
    }, []);

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
                        {!apiKeyExists ? <Warning /> : null}
                        <Button
                            type="submit"
                            disabled={apiKeyExists && (!props.values.city || props.isSubmitting)}
                            style={styles.btn}
                        >Submit</Button>
                    </form>
                </FormTemplate>
            )}
        </Formik>
    )
}

const Warning = () => {
    return (
        <div style={styles.Warning}>
            <h3>No API Key provided.</h3>
            <h4>Please add your OpenWeatherMaps API Key in 'Secrets &gt; OpenWeatherMaps Key'</h4>
        </div>
    )
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
    },
    Warning: {
        textAlign: 'center',
        backgroundColor: 'rgba(255,101,101,0.72)',
        color: '#dedede',
        padding: '2px 42px',
        borderRadius: '60px',
        
    }
}

export default WeatherForm;