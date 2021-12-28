import React, { useState, useEffect } from 'react';
import Widget from '../../containers/Widget';
import classes from './Quotes.module.scss';
import { defaultQ, fetchData } from './helper';

const Quotes = (props) => {
    const { id, meta, content } = props;
    const { data, params } = content;

    const [q, setQ] = useState(defaultQ);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function onMount() {
            try {
                const tmpQ = await fetchData(id, params);
                setQ(tmpQ);
            } catch (err) {
                setError(err);
            }
        }
        onMount();
    }, []);


    return (
        <Widget
            {...props}
            className={classes.Quotes}
            style={{
                backgroundColor: 'rgba(255,0,0,0.4)',
                borderRadius: 20
            }}
        >
            {/* <div>{time.hr}:{time.min}:{time:sec} <span style={{ display: params.military ? "none" : "inline-block" }}>{am ? "AM" : "PM"}</span></div> */}
            <div className={classes.content}>"{error ? error.message : q.content}"</div>
            <div className={classes.author}>~ {error ? error.name : q.author}</div>
        </Widget>
    )
}

export default Quotes;