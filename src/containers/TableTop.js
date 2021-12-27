import React, { useState, useEffect } from 'react';
import { WIDGETS, CONFIG } from '../common/util/db';
import { cookies, SECRETS } from '../common/util/cookies';
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
    // TODO: Find a way to hide the cover on start without hardcoding it.
    // const [showCover, setShowCover] = useState(meta.showCoverOnStart);
    const [showCover, setShowCover] = useState(false);
    const [coverMsg, setCoverMsg] = useState(null);

    useEffect(() => {
        async function onMount() {
            init();
            await updateMeta();
            await updateWidgets();
            await updateBg();
            await initSecrets();
            setLoaded(true);
            setShowCover(false);
        }
        onMount();
    }, [])

    const init = async () => {
        const emptyConfig = await CONFIG.length() == 0;
        if(!emptyConfig) {
            const _meta = await CONFIG.getItem('meta');
            const compatible = _meta && (_meta?.version ?? 0 >= DEFAULTS.META.compatibility);
            if(compatible) return Promise.resolve();
        }

        await WIDGETS.clear();
        await CONFIG.setItem('bg', DEFAULTS.BG);
        await CONFIG.setItem('imageSrcs', DEFAULTS.IMAGESRCS);
        await CONFIG.setItem('videoSrcs', DEFAULTS.VIDEOSRCS);
        await CONFIG.setItem('meta', DEFAULTS.META);
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

    const initSecrets = async () => {
        const expiryDate = new Date("2038-01-19T04:14:07");
        const secretDoc = await cookies.get(SECRETS);
        if(!secretDoc) {
            cookies.set(SECRETS, { }, { expires: expiryDate });
        }
        console.log(secretDoc.owmKey);
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
        try {
            await WIDGETS.removeItem(id);
            updateWidgets();
        } catch (err) {
            console.error(err);
        }
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

    const showCoverOnStart = (val = true) => {
        const _meta = { ...meta, showCoverOnStart: val };
        setMeta(_meta);
        CONFIG.setItem('meta', _meta);
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
    const configCtxProps = { addWidget, setBg, editMode, setEditMode, removeWidget, reload, clearWidgets, hideZeroWidgetMsg, meta, allowWidgetReposWithoutEdit, showCoverOnStart };

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