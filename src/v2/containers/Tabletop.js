import React, { useState, useEffect } from 'react';
import { db, WIDGETS } from '../common/util/db';
import Background from './Background';
import Dashboard from './Dashboard';
import Foreground from './Foreground';
import cuid from 'cuid';
import { ConfigContext } from '../common/util/contexts';

const TableTop = () => {
    const [widgets, setWidgets] = useState([]);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        async function onMount() {
            const w = await db.collection(WIDGETS).get();
            setWidgets(w);
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

    const dashboardProps = { widgets, setShowSettings }
    const foregroundProps = { showSettings, setShowSettings }

    return (
        <ConfigContext.Provider value={{ addWidget }}>
            <Background />
            <Dashboard {...dashboardProps} />
            <Foreground {...foregroundProps} />
        </ConfigContext.Provider>
    )
}

export default TableTop;