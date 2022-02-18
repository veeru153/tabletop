import { useState, useEffect } from 'react';
import Widget from '../../containers/Widget';
import classes from './Quotes.module.scss';
import { defaultQ, fetchData } from './helper';
import { WidgetInfo } from '../../common/util/types';

const Quotes = ({ id, meta, content } : WidgetInfo) => {
    const { data, params } = content;

    const [q, setQ] = useState(defaultQ);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        async function onMount() {
            try {
                const tmpQ = await fetchData(id, params);
                setQ(tmpQ);
            } catch (err : any) {
                setError(err);
            }
        }
        onMount();
    }, []);


    return (
        <Widget
            id={id}
            meta={meta}
            className={classes.Quotes}
        >
            {/* <div>{time.hr}:{time.min}:{time:sec} <span style={{ display: params.military ? "none" : "inline-block" }}>{am ? "AM" : "PM"}</span></div> */}
            <div className={classes.content}>"{error ? error.message : q.content}"</div>
            <div className={classes.author}>~ {error ? error.name : q.author}</div>
        </Widget>
    )
}

export default Quotes;