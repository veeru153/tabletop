import React from 'react';
import Widget from '../containers/Widget';
import classes from './Intro.module.scss';

const Tut0 = (props) => {
    const { id, meta, content } = props;

    return (
        <Widget
            id={id}
            meta={meta}
            className={classes.Intro}
            style={{
                width: 368,
                height: 168,
                textAlign: 'center',
                padding: 28,
            }}
        >
            <h1>Welcome to TableTop!</h1>
            <h3>A feature packed and fully customisable New Tab extension.</h3>
        </Widget>
    )
}

export default {
    type: 'tut0',
    el: <Tut0 />,
}