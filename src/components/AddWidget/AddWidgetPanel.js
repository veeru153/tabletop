import React from 'react';
import styles from './AddWidgetPanel.module.css';
import AddClock from './AddClock';
import AddWeather from './AddWeather';
import AddCovid from './AddCovid';

const AddWidgetPanel = () => {
    return (
        <div className={styles.container}>
            <div></div>
            {/* <div className={styles.AddWidgetPanel}>
                <h1>Add Widget</h1>
                <div className={styles.widgetList}>
                    <div><h2>Clock</h2></div>
                    <div><h2>COVID-19 India</h2></div>
                    <div><h2>Sticky Note</h2></div>
                    <div><h2>Weather</h2></div>
                </div>
            </div> */}
            {/* <AddClock /> */}
            {/* <AddWeather /> */}
            <AddCovid />
            <div></div>
        </div>
    )
}

export default AddWidgetPanel;