import { useState, useEffect } from 'react';
import classes from './Quotes.module.scss';
import { defaultQ, fetchData } from './helper';
import { WidgetProps } from '../../common/util/types';
import withWidget from '../../common/hoc/withWidget';

const Quotes = ({ id, content } : WidgetProps) => {
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
        <div className={classes.Quotes}>
            {/* <div>{time.hr}:{time.min}:{time:sec} <span style={{ display: params.military ? "none" : "inline-block" }}>{am ? "AM" : "PM"}</span></div> */}
            <div className={classes.content}>"{error ? error.message : q.content}"</div>
            <div className={classes.author}>~ {error ? error.name : q.author}</div>
        </div>
    )
}

export default withWidget(Quotes);