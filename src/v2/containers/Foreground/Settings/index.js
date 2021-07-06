import React, { useState, useEffect, useCallback } from 'react';
import classes from './Settings.module.scss';
import { ArrowUpwardRounded, CloseRounded } from '@material-ui/icons';
import { X, ArrowUp } from 'react-feather';
import RootSettings from './pages/RootSettings';
import { NavContext } from '../../../common/util/contexts';

// Container for all Settings and config pages
const Settings = ({ showSettings, setShowSettings }) => {
    const [pageStack, setPageStack] = useState([<RootSettings />, ]);
    const [level, setLevel] = useState(pageStack.length);

    const upOneLevel = () => {
        if(level === 1) {
            setShowSettings(false);
            return;
        }
        setLevel(Math.max(0, level-1));
        const upwardTimeout =  setTimeout(() => setPageStack(pageStack.slice(0, level-1)), 400);
        return () => clearTimeout(upwardTimeout);
    }

    const open = (page) => {
        if(!page) return;
        const tmpPageStack  = [...pageStack];
        tmpPageStack.push(page)
        setPageStack(tmpPageStack);
        setLevel(tmpPageStack.length);
    }

    const close = () => {
        setShowSettings(false);
    }

    const onEscPress = useCallback((e) => {
        if(showSettings) {
            if(e.key === "Escape") {
                if(level === 1) setShowSettings(false);
                else upOneLevel();
            }
        }
    });
    useEffect(() => {
        document.addEventListener("keydown", onEscPress);
        return () =>  document.removeEventListener("keydown", onEscPress);
    }, [showSettings, level])

    // Set Level to 0 when Settings are closed/opened
    useEffect(() => {
        const backToRoot = setTimeout(() => setPageStack([<RootSettings />]), 400);
        setLevel(1);
        return () => clearTimeout(backToRoot);
    }, [showSettings]);

    const LeftSide = () => (
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
    )

    const RightSide = () => (
        <div className={classes.sides}>
            <button
                className={classes.uiBtns}
                onClick={close}
            >
                <X size={42} color="#dedede" />
            </button>
        </div>
    )

    return (
        <div className={classes.Settings}>
            {(level > 1) ? <LeftSide /> : null}
            <NavContext.Provider value={{ open, close }}>
                <div 
                    className={classes.main}
                    style={{ transform: `translateY(${-(level-1)*100}vh)` }}
                >
                    {pageStack.map(page => page)}
                </div>
            </NavContext.Provider>
            <RightSide />
        </div>
    )
}

export default Settings;