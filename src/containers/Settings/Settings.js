import React, { useState, useEffect, useContext } from 'react';
import classes from './Settings.module.css';
import Option from './Option';
import AddWidget from './AddWidget';
import { ConfigContext, NavContext } from '../../util/contexts';

// TODO: Update Up and Close buttons to glyphs

const Settings = () => {
    const { showSettings, setShowSettings } = useContext(ConfigContext);
    const [pageStack, setPageStack] = useState([<RootSettings />]);
    // const level = Math.max(0, pageStack.length - 1);
    const [level, setLevel] = useState(0);

    // Set Level to 0 when Settings are closed/opened
    useEffect(() => {
        const backToRoot = setTimeout(() => setPageStack([<RootSettings />]), 400);
        return () => clearTimeout(backToRoot);
    }, [showSettings]);

    const upOneLevel = () => {
        if(pageStack.length <= 1) return;
        setLevel(Math.max(0, level-1));
        setPageStack([...pageStack.slice(0, level+1)]);
    }

    return (
        <div
            className={classes.wrapper}
            style={{ transform: showSettings ? "translateY(0)" : "translateY(100%)" }}
        >
            <div className={classes.sides}>
                <button onClick={upOneLevel}>Up</button>
            </div> 
            <NavContext.Provider value={{ pageStack, setPageStack, level, setLevel }}>
                <div 
                    className={classes.main}
                    style={{ transform: `translateY(${-level*100}vh)`}}
                >
                    {pageStack.map(pageEl => pageEl)}
                </div>
            </NavContext.Provider>
            <div className={classes.sides}>
                <button onClick={() => setShowSettings(false)}>Close</button>
            </div>
        </div>
    )
}

const RootSettings = () => {
    return (
        <div className={classes.Settings}>
            <header>
                <h1>Settings</h1>
                <h3>Control and Customise your Dashboard!</h3>
            </header>
            <section>
                {rootNavChoices.map(choice => <Option key={choice.key} opt={choice} />)}
            </section>
        </div>
    )
}

const rootNavChoices = [
    { 
        key: 'addWidget',
        img: '', 
        name: 'Add Widget', 
        next: <AddWidget />
    },
    { 
        key: 'removeWidget',
        img: '', 
        name: 'Remove Widgets', 
        next: null
    },
    { 
        key: 'config',
        img: '', 
        name: 'Configure', 
        next: null
    },
    { 
        key: 'secrets',
        img: '', 
        name: 'Secrets', 
        next: null
    },
]

export default Settings;