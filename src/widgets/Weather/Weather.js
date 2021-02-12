import React, { useState, useEffect } from 'react';
import classes from './Weather.module.css';
import Widget from '../../containers/Widget';
import { fetchData } from './helper';
import { icons, backgrounds } from './assets';

const Weather = (props) => {
    const [w, setW] = useState(defaultW)

    // Fetch Weather
    useEffect(() => {
        async function a() {
            const updatedW = await fetchData("New Delhi");
            setW(updatedW);
        }
        a();
    }, [])

    return (
        <Widget
            className={classes.Weather}
            style={{ backgroundImage: `url(${backgrounds[w.weather[0].icon]})` }}
        >
            <div>
                <div className={classes.city}>{w.name}</div>
                <div className={classes.temp}>{Math.round(w.main.feels_like)}°C</div>
            </div>
            <div className={classes.info}>
                <Icon id={w.weather[0].icon} />
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
            <img src={icons[id]} style={{ width: '100%', height: '100%'}} alt={icons[id]}/>
        </div>
    )
}

const defaultW = {
    clouds: { all: 0 },
    coord: { lat: 0, lon: 0 },
    dt: 0,
    id: 0,
    main: {
        temp: 0, 
        feels_like: 0, 
        temp_min: 0, 
        temp_max: 0, 
        humidity: 0,
        pressure: 0
    },
    name: "Loading...",
    rain: null,
    snow: null,
    sys: { country: "Loading..." },
    weather: [{ id: 701, main: "Loading...", description: "Loading...", icon: "50n" }],
    wind: { speed: 0, deg: 0 },
}

export default Weather;