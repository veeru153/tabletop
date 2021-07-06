import React, { useState, useEffect } from 'react';
import classes from './Secrets.module.scss';
import secretsList from '../../../../common/util/secretsList';
import { Formik } from 'formik';
import { cookies, SECRETS } from '../../../../common/util/cookies';
import { TextInput, Button, Page } from '../../../../common/ui';

const Secrets = () => {
    const [secretDoc, setSecretDoc] = useState({});
    const [loaded, setLoaded] = useState(false);
    const secretsObj = Object.entries(secretDoc);

    useEffect(() => {
        async function onMount() {
            const fetchedSecretDoc = await cookies.get(SECRETS) ?? {};
            for(const s in secretsList) {
                if(!fetchedSecretDoc) break;
                if(!fetchedSecretDoc[s]) {
                    fetchedSecretDoc[s] = secretsList[s];
                }
            }
            setSecretDoc(fetchedSecretDoc);
            setLoaded(true);
        }
        onMount();
    }, [])

    const handleUpdate = async (e, values) => {
        e.preventDefault();
        // Need a better way to handle this
        const expiryDate = new Date("2038-01-19T04:14:07");
        cookies.set(SECRETS, values, { expires: expiryDate });
        setSecretDoc(values);
    }

    return (
        <Page
            title="Secrets"
            subtitle="DO NOT SHARE THESE! Reload the page when the values have been updates."
        >
            {loaded ? <Formik
                initialValues={{...secretDoc}}
            >
                {(props) => (
                    <div>
                        {secretsObj.map(s => (
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
        </Page>
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
        <form onSubmit={(e) => handleUpdate(e, props.values)} className={classes.secretRow}>
            <div>
                <p>{name}</p>
                <TextInput
                    name={name}
                    type="password"
                    placeholder="Secret Key"
                    onChange={handleChange}
                    value={props.values[id].token}
                />
            </div>
            <div>
                <Button style={{ margin: '8px auto'}} type="submit">Update</Button>
            </div>
        </form>
    )
}

export default Secrets;