import React, { useState, useEffect } from 'react';
import styles from './AddWidgetPanel.module.css';
import AddClock from './AddClock';
import AddWeather from './AddWeather';
import AddCovid from './AddCovid';

const AddWidgetPanel = (props) => {
    const { addMode } = props;
    const [panelType, setPanelType] = useState(null);

    useEffect(() => {
        if(addMode === false) setPanelType(null);
    })

    return (
        <div className={styles.container} style={{
            transform: addMode ? `translateY(0%)` : `translateY(100%)`,
        }}>
            <div></div>
            <div style={{ display: addMode ? 'block' : 'none',}}>
                <div className={styles.AddWidgetPanel} style={{
                    transform: panelType ? `translateY(-100%)` : `translateY(0%)`,
                    transition: 'transform 0.4s ease',
                }}>
                    <h1>Add Widget</h1>
                    <div className={styles.widgetList}>
                        <div onClick={() => setPanelType('clock')}><h2>Clock</h2></div>
                        <div onClick={() => setPanelType('covid')}><h2>COVID-19 India</h2></div>
                        <div onClick={() => setPanelType('sticky')}><h2>Sticky Note</h2></div>
                        <div onClick={() => setPanelType('weather')}><h2>Weather</h2></div>
                    </div>
                </div>
                <div className={styles.AddWidgetPanel} style={{
                    transform: panelType ? `translateY(-100%)` : `translateY(0%)`,
                    transition: 'transform 0.4s ease',
                }}>
                    {panelType === 'clock' ? <AddClock /> : null}
                    {panelType === 'weather' ? <AddWeather /> : null}
                    {panelType === 'covid' ? <AddCovid /> : null}
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default AddWidgetPanel;