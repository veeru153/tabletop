import React, { useState, useEffect } from 'react';
import { WIDGETS, CONFIG } from '../common/util/db';
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
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        async function onMount() {
            updateWidgets();
            updateBg();
            setLoaded(true);
        }
        onMount();
    }, [])

    const updateWidgets = async () => {
        const w = [];
        await WIDGETS.iterate(val => { w.push(val) });
        setWidgets(w);
    }

    const updateBg = async () => {
        const bg = await CONFIG.getItem('bg2');
        setBg(bg);
    }

    const addWidget = async (type, params) => {
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
        await WIDGETS.setItem(id, template);
    }

    const removeWidget = async (id) => {
        await WIDGETS.removeItem(id);
        updateWidgets();
    }

    const dashboardProps = { widgets, setShowSettings, setShowAddWidget, filter: bg.filter }
    const foregroundProps = { showSettings, setShowSettings, showAddWidget, setShowAddWidget }
    const configCtxProps = { addWidget, setBg, editMode, setEditMode, removeWidget }

    return (
        <ConfigContext.Provider value={configCtxProps}>
            {loaded && <Background bg={bg} />}
            <Dashboard {...dashboardProps} />
            <Foreground {...foregroundProps} />
        </ConfigContext.Provider>
    )
}

export default TableTop;