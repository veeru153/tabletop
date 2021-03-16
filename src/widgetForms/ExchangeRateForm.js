import React, { useContext } from 'react';
import { Formik } from 'formik';
import { ConfigContext } from '../util/contexts';
import FormTemplate from '../containers/Settings/FormTemplate';
import { Dropdown, Button } from '../ui';
import { EXCHANGE } from '../widgets';

const CurrencyForm = () => {
    const { addWidget } = useContext(ConfigContext);

    return (
        <Formik
            initialValues={{ base: "USD", symbol: "EUR" }}
            onSubmit={(values, actions) => {
                addWidget(EXCHANGE.type, values);
                actions.resetForm();
            }}
        >
            {(props) => (
                <FormTemplate
                    title="Add Widget : Exchange Rate"
                >
                    <form onSubmit={props.handleSubmit} style={styles.form}>
                        <div style={styles.container}>
                            <h3>Covert from: </h3>
                            <Dropdown
                                name="base"
                                onChange={(e) => props.setFieldValue("base", e.target.value)}
                                options={currencyList}
                                defaultValue="USD"
                            />
                            <h3> to: </h3>
                            <Dropdown
                                name="symbol"
                                onChange={(e) => props.setFieldValue("symbol", e.target.value)}
                                options={currencyList}
                                defaultValue="EUR"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={props.isSubmitting}
                            style={styles.btn}
                        >Submit</Button>
                    </form>
                </FormTemplate>
            )}
        </Formik>
    )
}

const currencyList = [
    { val: 'USD', label: 'US Dollar' },
    { val: 'EUR', label: 'Euro' },
    { val: 'AUD', label: 'Australian Dollar' },
    { val: 'BRL', label: 'Brazilian Real' },
    { val: 'BGN', label: 'Bulgarian Lev' },
    { val: 'CAD', label: 'Canadian Dollar' },
    { val: 'CNY', label: 'Chinese Yuan Renminbi' },
    { val: 'HRK', label: 'Croatian Kuna' },
    { val: 'CZK', label: 'Czech Koruna' },
    { val: 'DKK', label: 'Danish Krone' },
    { val: 'HKD', label: 'Hong Kong Dollar' },
    { val: 'HUF', label: 'Hungarian Forint' },
    { val: 'ISK', label: 'Icelandic Krona' },
    { val: 'INR', label: 'Indian Rupee' },
    { val: 'IDR', label: 'Indonesian Rupiah' },
    { val: 'ILS', label: 'Israeli Shekel' },
    { val: 'MYR', label: 'Malaysian Ringgit' },
    { val: 'MXN', label: 'Mexican Peso' },
    { val: 'NZD', label: 'New Zealand Dollar' },
    { val: 'NOK', label: 'Norwegian Krone' },
    { val: 'PHP', label: 'Philippine Peso' },
    { val: 'PLN', label: 'Polish Zloty' },
    { val: 'GBP', label: 'Pound Sterling' },
    { val: 'RON', label: 'Romanian Leu' },
    { val: 'RUB', label: 'Russian Rouble' },
    { val: 'SGD', label: 'Singapore Dollar' },
    { val: 'ZAR', label: 'South African Rand' },
    { val: 'KRW', label: 'South Korean Won' },
    { val: 'SEK', label: 'Swedish Krona' },
    { val: 'CHF', label: 'Swiss Franc' },
    { val: 'THB', label: 'Thai baht' },
    { val: 'TRY', label: 'Turkish Lira' },
]

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 36,
    },
    radioBtn: {
        fontSize: '18.72px',
    },
    btn: {
        margin: '100px auto',
    },
}

export default CurrencyForm;