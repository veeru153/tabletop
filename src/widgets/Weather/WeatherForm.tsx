import React, { useState, useEffect, useContext } from 'react';
import { ConfigContext, NavContext } from '../../common/util/contexts';
import { Formik } from 'formik';
import { TextInput, Button, Radio, Page } from '../../common/ui';
import { cookies, SECRETS } from '../../common/util/cookies';
import widget from '.';

// TODO: Add an warning message that OWM Key has not been set.

const WeatherForm = () => {
    const { addWidget } = useContext(ConfigContext);
    const { close } = useContext(NavContext);
    const [apiKeyExists, setApiKeyExists] = useState(false);

    useEffect(() => {
        async function doesApiKeyExist() {
            const { owmKey } = await cookies.get(SECRETS);
            setApiKeyExists(owmKey && owmKey?.token);
        }
        doesApiKeyExist();
    }, []);

    const values = { 
        units: 'metric', 
        city: '' 
    }

    return (
        <Formik
            initialValues={values}
            onSubmit={(values, actions) => {
                addWidget(widget.type, values);
                close()
                actions.resetForm();
            }}
        >
            {(props) => (
                <Page
                    title="Add Widget : Weather"
                    subtitle="Make sure you have your OpenWeatherMaps API Key in 'Secrets'!"
                >
                    <form onSubmit={props.handleSubmit} style={styles.form}>
                        <div style={styles.unitsContainer}>
                            <h3>Units: </h3>
                            <Radio
                                label="°C"
                                name="metricUnits"
                                value="metric"
                                checked={props.values.units === "metric"}
                                onChange={() => props.setFieldValue('units', "metric")}
                                style={styles.radioBtn}
                            />
                            <Radio
                                label="°F"
                                name="imperialUnits"
                                value="imperial"
                                checked={props.values.units === "imperial"}
                                onChange={() => props.setFieldValue('units', "imperial")}
                                style={styles.radioBtn}
                            />
                        </div>
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
                </Page>
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
    unitsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 50,
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
        backgroundColor: 'rgba(255,97,69,0.32)',
        color: '#dedede',
        padding: '2px 42px',
    },
    radioBtn: {
        fontSize: '18.72px',
    },
}

export default WeatherForm;