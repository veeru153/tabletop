import React, { useState } from 'react';
import classes from './Dashboard.module.scss';
import { Menu, Edit2, Plus, ChevronUp, ChevronDown, Settings } from 'react-feather';

const Toolbar = ({ setShowSettings, setShowAddWidget, editMode, setEditMode }) => {
    const [expandToolbar, setExpandToolbar] = useState(false);
    const menuIcon = expandToolbar ? <ChevronDown size={36} color="#dedede" /> : <ChevronUp size={36} color="#dedede" />
    
    const toolbarOptions = [
        {
            onMouseOver: () => setExpandToolbar(true),
            icon: menuIcon,
        },
        {
            onClick: () => setShowAddWidget(true),
            icon: <Plus size={40} color="#dedede" />,
        },
        {
            onClick: () => setEditMode(!editMode),
            icon: <Edit2 size={30} color="#dedede" />,
        },
        {
            onClick: () => setShowSettings(true),
            icon: <Settings size={36} color="#dedede" />
        },
    ]

    const n = toolbarOptions.length;
    const dy = ((n-1)/n) * 100;

    return (
        <div
            className={classes.toolbar}
            onMouseLeave={() => setExpandToolbar(false)}
            style={{ transform: expandToolbar ? 'translateY(0)' : `translateY(${dy}%)` }}
        >
            {toolbarOptions.map(t => <ToolbarBtn {...t} />)}
        </div>
    )
}


const ToolbarBtn = (props) => {
    const { icon } = props;

    return (
        <button className={classes.toolbarBtn} {...props} >
            {icon}
        </button>
    )
}

export default Toolbar;