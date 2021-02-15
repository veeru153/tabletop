import React, { useState, useEffect } from 'react';
import classes from './Weather.module.css';
import Widget from '../../containers/Widget';
import { fetchData, defaultW } from './helper';
import { icons, backgrounds } from './assets';

const Weather = (props) => {
    const { id, meta } = props;
    const [w, setW] = useState(defaultW);

    // Fetch Updated Weather or show Saved Weather
    useEffect(() => {
        async function a() {
            const updatedW = await fetchData(id, "New Delhi");
            setW(updatedW);
        }
        a();
    }, [])

    const wStyle = {
        backgroundImage: `url(${backgrounds[w.weather[0].icon]})`,
        color: (/.*d$/).test(w.weather[0].icon) ? 'black' : 'white'
    }

    return (
        <Widget
            meta={meta}
            className={classes.Weather}
            style={wStyle}
        >
            <div>
                <div className={classes.city}>{w.name}</div>
                <div className={classes.temp}>{Math.round(w.main.feels_like)}°C</div>
            </div>
            <div className={classes.info}>
                <Icon id={w.weather[0].icon} size={36} />
                <div className={classes.condn}>{w.weather[0].main}</div>
                <div className={classes.hl}>
                    <div>H: {Math.round(w.main.temp_max)}°C</div>
                    <div>L: {Math.round(w.main.temp_min)}°C</div>
                </div>
            </div>
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
            <img src={icons[id]} style={{ width: '100%', height: '100%' }} alt={icons[id]} />
        </div>
    )
}

export default Weather;