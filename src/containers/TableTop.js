import React, { useState, useEffect } from 'react';
import * as DEFAULTS from '../common/util/defaults';
import Background from './Background';
import Dashboard from './Dashboard';
import Foreground from './Foreground';
import Cover from './Cover';
import IntroWidgets from '../introWidgets/list';
import { ConfigContext } from '../common/util/contexts';

const TableTop = () => {
    const [bg, setBg] = useState(DEFAULTS.BG);
    const [meta, setMeta] = useState(DEFAULTS.META);
    const [loaded, setLoaded] = useState(false);
    const [widgets, setWidgets] = useState(IntroWidgets);
    const [showSettings, setShowSettings] = useState(false);
    const [showAddWidget, setShowAddWidget] = useState(false);
    const [editMode, setEditMode] = useState(false);
    // TODO: Find a way to hide the cover on start without hardcoding it.
    // const [showCover, setShowCover] = useState(meta.showCoverOnStart);
    const [showCover, setShowCover] = useState(true);
    const [coverMsg, setCoverMsg] = useState(null);

    useEffect(() => {
        async function onMount() {
            setLoaded(true);
            setShowCover(false);
        }
        onMount();
    }, [])

    const addWidget = async (type, params) => {
        const id = widgets.length;
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
        return Promise.resolve();
    }

    const removeWidget = async (id) => {
        const w = [...widgets];
        w.splice(id, 1);
        setWidgets(w);
        return Promise.resolve();
    }

    const clearWidgets = async () => {
        setWidgets([]);
        return Promise.resolve();
    }

    const hideZeroWidgetMsg = (val = true) => {
        const _meta = { ...meta, showZeroWidgetMsg: !val };
        setMeta(_meta);
    }

    const allowWidgetReposWithoutEdit = (val = true) => {
        const _meta = { ...meta, allowWidgetReposWithoutEdit: val };
        setMeta(_meta);
    }

    const dashboardProps = { widgets, setShowSettings, setShowAddWidget, filter: bg.filter, showZeroWidgetMsg: meta.showZeroWidgetMsg, hideZeroWidgetMsg };
    const foregroundProps = { showSettings, setShowSettings, showAddWidget, setShowAddWidget };
    const coverProps = { showCover, coverMsg, bgColor: bg.color, showCoverOnStart: meta.showCoverOnStart };
    const configCtxProps = { addWidget, setBg, editMode, setEditMode, removeWidget, clearWidgets, hideZeroWidgetMsg, meta, allowWidgetReposWithoutEdit };

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