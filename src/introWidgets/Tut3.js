import React from 'react';
import Widget from '../containers/Widget';
import classes from './Intro.module.scss';
import { Edit2, Settings, GitHub } from 'react-feather';

const Tut3 = (props) => {
    const { id, meta, content } = props;

    return (
        <Widget
            id={id}
            meta={meta}
            className={classes.Intro}
            style={{
                width: 480,
                height: 268,
                padding: 28,
                alignItems: 'start',
            }}
        >
            <h2 style={{ margin: '14px 0' }}>What else can I do?</h2>
            <p style={styles.p}>You can enable Edit Mode by clicking on <Edit2 style={styles.icon} /> in the toolbar.</p>
            <p style={styles.p}>This allows you to move around and remove widgets.</p>
            <p style={styles.p}>Check out more stuff by clicking on <Settings style={styles.icon} /> in the toolbar.</p>
            <p style={styles.p}>This page serves as a demonstration.</p>
            <p style={{ margin: '4px 0' }}>Download the app by clicking <a target="_blank" href="https://github.com/veeru153/tabletop/releases" style={styles.a}>here</a> to experience all the features.</p>
            <p style={styles.p}>This is an open source project!</p>
            <p style={styles.p}>Check out the GitHub repository by clicking on <GitHub style={styles.icon} /> in the toolbar.</p>

        </Widget>
    )
}

const styles = {
    p: {
        display: 'flex', 
        alignItems: 'center', 
        margin: '4px 0' 
    },
    a: {
        textDecoration: 'underline',
        color: '#dedede',
    },
    icon: {
        margin: '0 4px',
    }
}

export default {
    type: 'tut3',
    el: <Tut3 />,
}