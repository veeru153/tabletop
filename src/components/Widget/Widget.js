import React from 'react';
import Clock from '../widgets/Clock/Clock';
import CovidLarge from '../widgets/Covid19India/CovidLarge/CovidLarge';
import CovidSmall from '../widgets/Covid19India/CovidSmall/CovidSmall';
import StickyNote from '../widgets/StickyNote/StickyNote';
import WeatherSmall from '../widgets/Weather/WeatherSmall/WeatherSmall';
import * as w from './wKey';

const Widget = (props) => {
    const { id, z, type, q, movable, deleteMode, removeWidget } = props;
    const getSavedState = (id) => {
        return JSON.parse(localStorage.getItem(id));
    }
    
    let desiredWidget = <div></div>;
    switch(type) {
        case w.Clock:
            desiredWidget = (<Clock z={z} q={q} movable={movable} savedState={getSavedState(id)}/>)
            break;
        case w.CovidLarge:
            desiredWidget = (<CovidLarge z={z} q={q} movable={movable} savedState={getSavedState(id)}/>)
            break;
        case w.CovidSmall:
            desiredWidget = (<CovidSmall z={z} q={q} movable={movable} savedState={getSavedState(id)}/>)
            break;
        case w.StickyNote:
            desiredWidget = (<StickyNote z={z} movable={movable} savedState={getSavedState(id)}/>)
            break;
        case w.WeatherSmall:
            desiredWidget = (<WeatherSmall z={z} q={q} movable={movable} savedState={getSavedState(id)} />)
            break;
        default:
            break;
    }

    return (
        <div onClick={() => {deleteMode && removeWidget(id)}}>
            {desiredWidget}
        </div>
    )

}

export default Widget;
