import React, { useState } from 'react';
import classes from './Dashboard.module.scss';
import { MenuRounded, AddRounded, EditRounded } from '@material-ui/icons';
import { Menu, Edit2, Plus } from 'react-feather';

const Toolbar = ({ setShowSettings }) => {
    const [expandToolbar, setExpandToolbar] = useState(false);
    const btnStyle = { transform: expandToolbar ? 'translateY(0)' : 'translateY(500%)' };
    
    const toolbarOptions = [
        {
            onClick: () => { },
            icon: <Plus size={40} color="#dedede" />,
            style: btnStyle,
        },
        {
            onClick: () => { },
            icon: <Edit2 size={30} color="#dedede" />,
            style: btnStyle,
        },
        {
            onClick: () => setShowSettings(true),
            onMouseOver: () => setExpandToolbar(true),
            icon: <Menu size={36} color="#dedede" />
        },
    ]

    return (
        <div
            className={classes.toolbar}
            onMouseLeave={() => setExpandToolbar(false)}
        >
            {toolbarOptions.map(t => <ToolbarBtn {...t} />)}
        </div>
    )
}


const ToolbarBtn = (props) => {
    const { icon, style } = props;
    const btnProps = { ...props };

    return (
        <button 
            className={classes.toolbarBtn} 
            style={style}
            {...btnProps}
        >
            {icon}
        </button>
    )
}

const styles = {
    toolbarBtn: {
        fontSize: 46,
        color: '#dedede',
    }
}



export default Toolbar;