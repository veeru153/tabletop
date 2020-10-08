import React, { Component, useState } from 'react';
import styles from './MenuBar.module.css';
import { Menu, X, Plus, Move, Trash2, Settings } from 'react-feather';

const MenuBar = (props) => {
    const [expanded, setExpanded] = useState(false);
    const { toggleMovable } = props;

    return (
        <div 
            className={styles.MenuBar} 
            style={{ display: expanded ? 'grid' : 'block' }}
        >
            <div className={styles.menuBtn}>
                {expanded
                    ? <X size={60} color="#dadada" onClick={() => setExpanded(false)} />
                    : <Menu size={60} color="#dadada" onClick={() => setExpanded(true)} />}
            </div>
            <div 
                className={styles.options}
                style={{ display: expanded ? 'flex' : 'none' }}
            >
                <Settings size={48} color="#dadada" />
                <Move size={48} color="#dadada" onClick={toggleMovable}/>
                <Trash2 size={48} color="#dadada" />
                <Plus size={60} color="#dadada" />
            </div>
        </div>
    )
}

export default MenuBar;