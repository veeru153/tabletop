import React, { useState, useEffect } from 'react';
import { db, WIDGETS } from '../common/util/db';
import * as DEFAULTS from '../common/util/defaults';
import Background from './Background';
import Dashboard from './Dashboard';
import Foreground from './Foreground';
import cuid from 'cuid';
import { ConfigContext } from '../common/util/contexts';

const TableTop = () => {
    const [bg, setBg] = useState(DEFAULTS.BG);
    const [loaded, setLoaded] = useState(false);
    const [widgets, setWidgets] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [showAddWidget, setShowAddWidget] = useState(false);

    useEffect(() => {
        async function onMount() {
            const w = await db.collection(WIDGETS).get();
            setWidgets(w);
            setLoaded(true);
        }
        onMount();
    }, [])

    const addWidget = (type, params) => {
        const id = cuid();
        const template = {
            key: id,
            meta: {
                pos: { x: 10, y: 10 },
                type: type,
                z: widgets.length + 1,
            },
            content: {
                params: params,
                data: {}
            }
        }
        setWidgets([...widgets, template]);
        db.collection(WIDGETS).add(template, id);
    }

    const dashboardProps = { widgets, setShowSettings, setShowAddWidget }
    const foregroundProps = { showSettings, setShowSettings, showAddWidget, setShowAddWidget }

    return (
        <ConfigContext.Provider value={{ addWidget, setBg }}>
            {loaded && <Background bg={bg} />}
            <Dashboard {...dashboardProps} />
            <Foreground {...foregroundProps} />
        </ConfigContext.Provider>
    )
}

export default TableTop;