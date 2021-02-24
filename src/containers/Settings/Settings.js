import React, { useState, useEffect, useContext } from 'react';
import classes from './Settings.module.css';
import Option from './Option';
import rootNavRoutes from './rootNavRoutes';
import { ConfigContext, NavContext } from '../../util/contexts';
import { ArrowUp, X } from 'react-feather';

const Settings = () => {
    const { showSettings, setShowSettings } = useContext(ConfigContext);
    const [pageStack, setPageStack] = useState([<RootSettings />]);
    const [level, setLevel] = useState(0);

    // Set Level to 0 when Settings are closed/opened
    useEffect(() => {
        const backToRoot = setTimeout(() => setPageStack([<RootSettings />]), 400);
        setLevel(0);
        return () => clearTimeout(backToRoot);
    }, [showSettings]);

    const upOneLevel = () => {
        if(pageStack.length <= 1) {
            setShowSettings(false);
            return;
        };
        setLevel(Math.max(0, level-1));
        const upwardTimeout =  setTimeout(() => setPageStack(pageStack.slice(0, level)), 400);
        return () => clearTimeout(upwardTimeout);
    }

    return (
        <div
            className={classes.wrapper}
            style={{ transform: showSettings ? "translateY(0)" : "translateY(100%)" }}
        >
            <div 
                className={classes.sides}  
                style={{ justifyContent: 'flex-end' }}
            >
                <button 
                    className={classes.uiBtns} 
                    style={{ margin: '0 20px', display: (level === 0) ? 'none' : 'block' }} 
                    onClick={upOneLevel}
                >
                    <ArrowUp size={42} color="#dedede" />
                </button>
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
                <button 
                    className={classes.uiBtns} 
                    onClick={() => setShowSettings(false)}
                >
                    <X size={42} color="#dedede" />
                </button>
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
                {rootNavRoutes.map(choice => <Option key={choice.key} opt={choice} />)}
            </section>
        </div>
    )
}

export default Settings;