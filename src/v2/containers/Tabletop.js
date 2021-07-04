import React, { useState } from 'react';
import Background from './Background';
import Dashboard from './Dashboard';

import cuid from 'cuid';
import { ConfigContext } from '../common/util/contexts';

const TableTop = () => {
    const [widgets, setWidgets] = useState([]);

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
    }

    return (
        <ConfigContext.Provider value={{ addWidget }}>
            <Background />
            <Dashboard widgets={widgets} />
        </ConfigContext.Provider>
    )
}

export default TableTop;