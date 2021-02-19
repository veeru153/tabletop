import React, { useState, useEffect } from 'react';
import classes from './Settings.module.css';
import FormTemplate from './FormTemplate.js';
import secretsList from './secretsList';
import { Formik } from 'formik';
import { db, CONFIG } from '../../util/db';

const SecretsForm = () => {
    const [secretDoc, setSecretDoc] = useState({});
    const [loaded, setLoaded] = useState(false);
    const SECRETS = Object.entries(secretDoc);

    useEffect(() => {
        async function a() {
            const fetchedSecretDoc = await db.collection(CONFIG).doc('secrets').get();
            for(const s in secretsList) {
                if(!fetchedSecretDoc[s]) {
                    fetchedSecretDoc[s] = secretsList[s];
                }
            }
            setSecretDoc(fetchedSecretDoc);
            setLoaded(true);
        }
        a();
    }, [])

    const handleUpdate = async (e, values) => {
        e.preventDefault();
        await db.collection(CONFIG).doc('secrets').set(values);
        setSecretDoc(values);
    }

    return (
        <FormTemplate
            title="Secrets"
            subtitle="DO NOT SHARE THESE!"
            formClasses={classes.Settings}
        >
            {loaded ? <Formik
                initialValues={{...secretDoc}}
            >
                {(props) => (
                    <div>
                        {SECRETS.map(s => (
                            <SecretRow 
                                {...props} 
                                key={s[0]} 
                                id={s[0]} 
                                name={s[1].name} 
                                handleUpdate={handleUpdate}
                            />
                            ))}
                    </div>
                )}
            </Formik> : <div>Loading...</div>}
        </FormTemplate>
    )
}

const SecretRow = (props) => {
    const { id, name, handleUpdate } = props;
    const secretObj = {...props.values[id]};

    const handleChange = (e) => {
        const { value } = e.target;
        secretObj.token = value;
        props.setFieldValue(id, secretObj);
    }

    return (
        <form onSubmit={(e) => handleUpdate(e, props.values)}>
            <div>
                <p>{name}</p>
                <input
                    name={name}
                    type="password"
                    placeholder="Secret Key"
                    onChange={handleChange}
                    value={props.values[id].token}
                />
            </div>
            <button type="submit">Update</button>
        </form>
    )
}

const updateSecretHandler = () => {

}

export default SecretsForm;