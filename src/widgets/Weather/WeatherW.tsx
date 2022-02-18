import React, { useState, useEffect } from 'react';
import classes from './Weather.module.scss';
import Widget from '../../containers/Widget';
import { icons } from './assets';
import { defaultW, fetchData } from './helper';

const Weather = ({ id, meta, content }) => {
    const { params, data } = content;
    const [w, setW] = useState(defaultW);
    const [unitsLabel, setUnitsLabel] = useState("C");
    const [error, setError] = useState(null);

    // Fetch Updated Weather or show Saved Weather
    useEffect(() => {
        async function onMount() {
            try {
                const updatedW = await fetchData(id, params);
                if(params.units === "imperial") setUnitsLabel("F");
                setW(updatedW);
            } catch (err) {
                setError(err);
            }
        }
        onMount();
    }, [])

    return (
        <Widget
            id={id}
            meta={meta}
            className={classes.Weather}
        >
            <div className={classes.temp}>
                <div className={classes.current}>
                    {error ? "Error" : `${Math.round(w.main.temp)}°${unitsLabel}`}
                </div>
                <div>{error ? 0 : Math.round(w.main.temp_max)}°{unitsLabel}</div>
                <div>{error ? 0 : Math.round(w.main.temp_min)}°{unitsLabel}</div>
            </div>
            <Icon id={error ? error.icon : w.weather[0].icon} size={82} />
            <div className={classes.city}>{error ? error.message : w.name}</div>
        </Widget>
    )
}

const Icon = ({ id, size }) => {
    const styles = {
        width: size ?? 44,
        height: size ?? 44,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div style={styles}>
            <img src={icons[id]} style={{ width: '100%', height: '100%' }} alt={icons[id]} draggable="false" />
        </div>
    )
}

export default Weather;