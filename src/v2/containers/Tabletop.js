import React, { useState, useEffect } from 'react';
import { db, WIDGETS } from '../common/util/db';
import Background from './Background';
import Dashboard from './Dashboard';

import cuid from 'cuid';
import { ConfigContext } from '../common/util/contexts';

const TableTop = () => {
    const [widgets, setWidgets] = useState([]);

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

    return (
        <ConfigContext.Provider value={{ addWidget }}>
            <Background />
            <Dashboard widgets={widgets} />
        </ConfigContext.Provider>
    )
}

export default TableTop;