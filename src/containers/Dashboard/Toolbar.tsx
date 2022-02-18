import { useState } from 'react';
import classes from './Dashboard.module.scss';
import { Menu, Edit2, Plus, ChevronUp, ChevronDown, Settings } from 'lucide-react';

const Toolbar = ({ setShowSettings, setShowAddWidget, editMode, setEditMode }) => {
    const [expandToolbar, setExpandToolbar] = useState(false);
    const menuIcon = expandToolbar ? <ChevronDown size={36} color="#dedede" /> : <ChevronUp size={36} color="#dedede" />
    
    const toolbarOptions = [
        {
            key: "Expand Toolbar",
            onMouseOver: () => setExpandToolbar(true),
            icon: menuIcon,
        },
        {
            key: "Add Widget",
            onClick: () => setShowAddWidget(true),
            icon: <Plus size={40} color="#dedede" />,
        },
        {
            key: "Edit Widgets",
            onClick: () => setEditMode(!editMode),
            icon: <Edit2 size={30} color="#dedede" />,
        },
        {
            key: "Settings",
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