import React, { useState, useEffect } from 'react';
import { WIDGETS, CONFIG } from '../common/util/db';
import * as DEFAULTS from '../common/util/defaults';
import Background from './Background';
import Dashboard from './Dashboard';
import Foreground from './Foreground';
import Cover from './Cover';
import cuid from 'cuid';
import { ConfigContext } from '../common/util/contexts';

const TableTop = () => {
    const [bg, setBg] = useState(DEFAULTS.BG);
    const [meta, setMeta] = useState(DEFAULTS.META);
    const [loaded, setLoaded] = useState(false);
    const [widgets, setWidgets] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [showAddWidget, setShowAddWidget] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showCover, setShowCover] = useState(false);
    const [coverMsg, setCoverMsg] = useState(null);

    useEffect(() => {
        async function onMount() {
            init();
            await updateWidgets();
            await updateBg();
            await updateMeta();
            setLoaded(true);
            // setShowCover(false);
        }
        onMount();
    }, [])

    const init = async () => {
        const emptyConfig = await CONFIG.length() == 0;
        if(!emptyConfig) return;

        CONFIG.setItem('bg', DEFAULTS.BG);
        CONFIG.setItem('imageSrcs', DEFAULTS.IMAGESRCS);
        CONFIG.setItem('videoSrcs', DEFAULTS.VIDEOSRCS);
        CONFIG.setItem('meta', DEFAULTS.META);
        return Promise.resolve();
    }

    const updateWidgets = async () => {
        const w = [];
        await WIDGETS.iterate(val => { w.push(val) });
        setWidgets(w);
    }

    const updateBg = async () => {
        const _bg = await CONFIG.getItem('bg');
        setBg({ ...bg, ..._bg });
        return Promise.resolve();
    }

    const updateMeta = async () => {
        const _meta = await CONFIG.getItem('meta');
        setMeta({ ...meta, ..._meta });
        return Promise.resolve();
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
        return Promise.resolve();
    }

    const removeWidget = async (id) => {
        await WIDGETS.removeItem(id);
        updateWidgets();
    }

    const clearWidgets = async () => {
        setWidgets([]);
        await WIDGETS.clear();
        return Promise.resolve();
    }

    const reload = async (_coverMsg = null) => {
        setCoverMsg(_coverMsg);
        setShowCover(true);
        setLoaded(false);
        await updateWidgets();
        await updateBg();
        setLoaded(true);
        setTimeout(() => setShowCover(false), 2000);
        setTimeout(() => setCoverMsg(null), 4000);
    }

    const hideZeroWidgetMsg = (val = true) => {
        const _meta = { ...meta, showZeroWidgetMsg: !val };
        setMeta(_meta);
        CONFIG.setItem('meta', _meta);
    }

    const allowWidgetReposWithoutEdit = (val = true) => {
        const _meta = { ...meta, allowWidgetReposWithoutEdit: val };
        setMeta(_meta);
        CONFIG.setItem('meta', _meta);
    }

    const dashboardProps = { widgets, setShowSettings, setShowAddWidget, filter: bg.filter, showZeroWidgetMsg: meta.showZeroWidgetMsg, hideZeroWidgetMsg };
    const foregroundProps = { showSettings, setShowSettings, showAddWidget, setShowAddWidget };
    const coverProps = { showCover, coverMsg, bgColor: bg.color, showCoverOnStart: meta.showCoverOnStart };
    const configCtxProps = { addWidget, setBg, editMode, setEditMode, removeWidget, reload, clearWidgets, hideZeroWidgetMsg, meta, allowWidgetReposWithoutEdit };

    return (
        <ConfigContext.Provider value={configCtxProps}>
            {loaded && <Background bg={bg} />}
            {loaded && <Dashboard {...dashboardProps} />}
            <Foreground {...foregroundProps} />
            <Cover {...coverProps} />
        </ConfigContext.Provider>
    )
}

export default TableTop;