import React, { useState, useEffect } from 'react';
import classes from './Dashboard.module.css';
import { db, CONFIG, WIDGETS } from '../util/db';
import * as defaults from '../util/defaults';
import cuid from 'cuid';
import Settings from './Settings/Settings';
import { ConfigContext } from '../util/contexts';
import WidgetRenderer from './WidgetRenderer';
import { Menu } from 'react-feather';

const Dashboard = () => {
    const [bg, setBg] = useState(defaults.BG);
    const [widgets, setWidgets] = useState([]);
    const [showSettings, setShowSettings] = useState(false);

    // Fetch Background Data and Widgets from IndexedDB on mount
    useEffect(() => {
        async function onMount() {
            const newBg = await db.collection(CONFIG).doc('bg').get();
            setBg(newBg);
            const w = await db.collection(WIDGETS).get({ keys: true });
            setWidgets(w);
        }
        onMount();
    }, [])

    const imgStyles = { 
        ...defaultStyles,
        backgroundImage: `url(${bg.image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: bg.blend.color,
        backgroundBlendMode: bg.blend.mode
    };
    const colorStyles  = { 
        ...defaultStyles,
        backgroundColor: bg.color,
    };
    const overlayStyles = {
        ...defaultStyles,
        backdropFilter: bg.filter.fn === "none" ? "none" : `${bg.filter.fn}(${bg.filter.value})`,
    }

    const addWidget = (type, q) => {
        const id = cuid();
        const template = {
            key: id,
            data: {
                meta: { 
                    pos: { x: 0, y: 0 }, 
                    type: type, 
                    z: widgets.length + 1, 
                    q: q 
                },
                params: {}
            }
        }
        setWidgets([...widgets, template]);
        db.collection(WIDGETS).add(template.data, id);
        setShowSettings(false);
    }

    const removeWidget = (id) => {
        const tempW = [...widgets];
        const widgetToRemove = tempW.find(w => w.key === id);
        const widgetIdx = tempW.indexOf(widgetToRemove);
        tempW.splice(widgetIdx, 1);
        setWidgets(tempW);
        db.collection(WIDGETS).doc(id).delete();
    }

    const configHandlers = { addWidget, removeWidget, bg, setBg, widgets, setWidgets, showSettings, setShowSettings };

    return (
        <div style={bg.usingImg ? imgStyles : colorStyles}>
            <ConfigContext.Provider value={configHandlers}>
                <Settings />
            </ConfigContext.Provider>
            <div style={overlayStyles}>
                {widgets.length === 0 ? <ZeroWidgets /> : widgets.map(w => <WidgetRenderer key={w.key} id={w.key} data={w.data}/>)}
            </div>
            <button
                className={classes.menuBtn}
                onClick={() => setShowSettings(!showSettings)}
            >
                <Menu size={42} color="#dedede" />
            </button>
        </div>
    )
}

const ZeroWidgets = () => {
    return (
        <div className={classes.zeroWidgets}>
            <h1>Welcome to TableTop!</h1>
            <h3>
                Seems quite empty, doesn't it?<br />
                Add Widgets by Clicking on the Menu button below.
            </h3>
        </div>
    )
}

const defaultStyles = {
    width: '100%',
    height: '100vh',
}

export default Dashboard;