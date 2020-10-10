import React, { Component, useState } from 'react';
import styles from './MenuBar.module.css';
import { Menu, X, Plus, Move, Trash2, Settings } from 'react-feather';

const MenuBar = (props) => {
    const [expanded, setExpanded] = useState(false);
    const { movable, deleteMode, toggleSetting } = props;

    return (
        <div 
            className={styles.MenuBar} 
            // style={{ display: expanded ? 'grid' : 'block' }}

        >
            <div 
                className={styles.options}
                // style={{ display: expanded ? 'flex' : 'none' }}
                style={{ transform: expanded ? 'translateX(0)' : 'translateX(200%)'}}
            >
                <Settings size={48} color="#dadada" />
                <Move 
                    size={48} 
                    color={movable ? "#58caed" : "#dadada"} 
                    onClick={() => toggleSetting('movable')}
                />
                <Trash2 
                    size={48} 
                    color={deleteMode ? "#ff6c52" : "#dadada"} 
                    onClick={() => toggleSetting('deleteMode')}
                />
                <Plus 
                    size={60} 
                    color="#dadada" 
                    style={{ margin: 0 }}
                    onClick={() => toggleSetting('addMode')}
                />
            </div>
            <div className={styles.menuBtn}>
                {expanded
                    ? <X 
                        size={60} 
                        color="#dadada" 
                        style={{ opacity: 1 }}
                        onClick={() => setExpanded(false)} 
                    />
                    : <Menu 
                        size={60} 
                        color="#dadada" 
                        onClick={() => setExpanded(true)} 
                    />}
            </div>
        </div>
    )
}

export default MenuBar;