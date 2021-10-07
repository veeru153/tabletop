import React from 'react';
import Widget from '../containers/Widget';
import classes from './Intro.module.scss';
import { ChevronUp, Plus } from 'react-feather';

const Tut2 = (props) => {
    const { id, meta, content } = props;

    return (
        <Widget
            id={id}
            meta={meta}
            className={classes.Intro}
            style={{
                width: 488,
                height: 168,
                padding: 28,
                alignItems: 'start',
            }}
        >
            <h2 style={{ margin: '14px 0' }}>What is a Widget?</h2>
            <p style={{ margin: '4px 0' }} >Everything on this screen is a widget.</p>
            <h2 style={{ margin: '14px 0' }}>How do I make one?</h2>
            <p style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                Open the toolbar by hovering over <ChevronUp /> and click on <Plus /> to get started.
            </p>
        </Widget>
    )
}

export default {
    type: 'tut2',
    el: <Tut2 />,
}