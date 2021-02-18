import React from 'react';
import classes from './Settings.module.css';
import Option from './Option';
import AddWeather from '../../widgets/Weather/AddWeather';
import AddClock from '../../widgets/Clock/AddClock';

const AddWidget = () => {
    return (
        <div className={classes.Settings}>
            <header>
                <h1>Add Widget</h1>
                <h3>Choose a Widget:</h3>
            </header>
            <section>
                {addWidgetNav.map(widget => <Option key={widget.key} opt={widget}/>)}
            </section>
        </div>
    )
}

const addWidgetNav = [
    {
        key: 'weather',
        img: '',
        name: "Weather",
        next: <AddWeather />
    },
    {
        key: 'clock',
        img: '',
        name: "Clock",
        next: <AddClock />
    },

]

export default AddWidget;