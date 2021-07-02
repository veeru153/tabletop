import React from 'react';
import Background from './Background';
import Dashboard from './Dashboard';
import Foreground from './Foreground';

const TableTop = () => {
    return (
        <div>
            <Background />
            <Dashboard />
            <Foreground />
        </div>
    )
}

export default TableTop;