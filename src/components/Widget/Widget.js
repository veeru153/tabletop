import React from 'react';
import Clock from '../widgets/Clock/Clock';
import CovidLarge from '../widgets/Covid19India/CovidLarge/CovidLarge';
import CovidSmall from '../widgets/Covid19India/CovidSmall/CovidSmall';
import StickyNote from '../widgets/StickyNote/StickyNote';
import WeatherSmall from '../widgets/Weather/WeatherSmall/WeatherSmall';
import * as w from './wKey';

const Widget = ({ id, z, type, q, movable }) => {
    const getSavedState = (id) => {
        return JSON.parse(localStorage.getItem(id));
    }

    switch(type) {
        case w.Clock:
            return <Clock z={z} q={q} movable={movable} savedState={getSavedState(id)}/>
        case w.CovidLarge:
            return <CovidLarge z={z} q={q} movable={movable} savedState={getSavedState(id)}/>
        case w.CovidSmall:
            return <CovidSmall z={z} q={q} movable={movable} savedState={getSavedState(id)}/>
        case w.StickyNote:
            return <StickyNote z={z} movable={movable} savedState={getSavedState(id)}/>
        case w.WeatherSmall:
            return <WeatherSmall z={z} q={q} movable={movable} savedState={getSavedState(id)} />
        default:
            return (<div></div>)
    }

}

export default Widget;
