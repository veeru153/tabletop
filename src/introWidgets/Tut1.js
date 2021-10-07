import React from 'react';
import Widget from '../containers/Widget';
import classes from './Intro.module.scss';

const Tut1 = (props) => {
    const { id, meta, content } = props;

    return (
        <Widget
            id={id}
            meta={meta}
            className={classes.Intro}
            style={{
                width: 464,
                height: 268,
                padding: 28,
            }}
        >
            <h2>What does it do?</h2>
            <h4 style={{ margin: '10px 0' }}>TableTop provides you the power to customise your new tab the way you want.</h4>
            <div style={{ width: '100%' }}>
                You can:
                <ul>
                    <li>show the type of content you want with widgets</li>
                    <li>move around widgets to customise your experience</li>
                    <li>pick any color or image as a background</li>
                    <li>add certain effects on the background</li>
                    <li>and much more...</li>
                </ul>
            </div>
        </Widget>
    )
}

export default {
    type: 'tut1',
    el: <Tut1 />,
}