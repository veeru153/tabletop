import React, { useState, useEffect } from 'react';
import classes from './Dashboard.module.css';
import { db, CONFIG, WIDGETS } from '../util/db';
import * as DEFAULTS from '../util/defaults';
import cuid from 'cuid';
import Settings from './Settings/Settings';
import { ConfigContext } from '../util/contexts';
import WidgetRenderer from './WidgetRenderer';
import { Menu } from 'react-feather';

const Dashboard = () => {
    const [bg, setBg] = useState(DEFAULTS.BG);
    const [meta, setMeta] = useState(DEFAULTS.META)
    const [widgets, setWidgets] = useState([]);
    const [showSettings, setShowSettings] = useState(false);

    // Fetch Background Data and Widgets from IndexedDB on mount
    useEffect(() => {
        async function onMount() {
            const newBg = await db.collection(CONFIG).doc('bg').get();
            setBg(newBg);
            const newMeta = await db.collection(CONFIG).doc('meta').get();
            setMeta(newMeta);
            const w = await db.collection(WIDGETS).get({ keys: true });
            setWidgets(w);
        }
        onMount();
    }, [])

    const { innerWidth: w, innerHeight: h } = window;

    const imgStyles = {
        ...defaultStyles,
        backgroundImage: (navigator.onLine && !bg.localImg) ? `url("https://picsum.photos/${w}/${h}.webp")` : `url(${bg.image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: bg.blend.color,
        backgroundBlendMode: bg.blend.mode,
    };
    const colorStyles = {
        ...defaultStyles,
        backgroundColor: bg.color,
    };
    const overlayStyles = {
        ...defaultStyles,
        backdropFilter: bg.filter.fn === "none" ? "none" : `${bg.filter.fn}(${bg.filter.value})`,
    }
    const fallback = {
        backgroundColor: bg.color,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
    }
    
    const hideZeroWidgetMsg = () => {
        const tempMeta = { ...meta };
        tempMeta.showZeroWidgetMsg = false;
        setMeta(tempMeta);
        db.collection(CONFIG).doc('meta').set(tempMeta);
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
        <>
            {/* <div style={fallback}></div> */}
            <div className={classes.Intro} style={fallback}>
                <h1>TableTop</h1>
            </div>
            <div style={bg.usingImg ? imgStyles : colorStyles}>
                <ConfigContext.Provider value={configHandlers}>
                    <Settings />
                </ConfigContext.Provider>
                <div style={overlayStyles}>
                    {widgets.length === 0 
                        ? <ZeroWidgets hideMsgFn={hideZeroWidgetMsg} showMsg={meta.showZeroWidgetMsg} /> 
                        : widgets.map(w => <WidgetRenderer key={w.key} id={w.key} data={w.data} />)}
                </div>
                <button
                    className={classes.menuBtn}
                    onClick={() => setShowSettings(!showSettings)}
                >
                    <Menu size={42} color="#dedede" />
                </button>
            </div>
        </>
    )
}

const ZeroWidgets = (props) => {
    const { showMsg, hideMsgFn } = props;

    const spanStyle = {
        textDecoration: 'underline',
        cursor: 'pointer',
    }

    if(!showMsg) return (<div></div>);

    return (
        <div className={classes.zeroWidgets}>
            <div className={classes.headingBg}>
                <h1>Welcome to TableTop!</h1>
                <h3>
                    Seems quite empty, doesn't it?<br />
                    Add Widgets by Clicking on the Menu button below.<br />
                    Click <span onClick={hideMsgFn} style={spanStyle}>here</span> to get rid of this message.
                </h3>
            </div>
        </div>
    )
}

const defaultStyles = {
    width: '100%',
    height: '100vh',
}

export default Dashboard;