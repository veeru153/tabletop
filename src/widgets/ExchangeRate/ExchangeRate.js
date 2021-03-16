import React, { useState, useEffect } from 'react';
import Widget from '../../containers/Widget';
import classes from './ExchangeRate.module.css';
import { fetchRate, defaultData } from './helper';

const ExchangeRate = (props) => {
    const { id, meta, } = props;
    const { base, symbol } = meta.q;
    const [data, setData] = useState(defaultData);

    useEffect(() => {
        async function onMount() {
            const newData = await fetchRate(id, base, symbol);
            setData(newData);
        }
        onMount();
    }, [])

    return (
        <Widget
            id={id}
            meta={meta}
            className={classes.ExchangeRate}
        >
            <div className={classes.label}>
                1 {base} = {symbol}
            </div>
            <div 
                className={classes.rate} 
                style={{ color: getTrendColor(data.trend) }}
            >
                {data.rate.toFixed(2)}
            </div>
            <div className={classes.date}>
                Updated: {data.date}
            </div>
        </Widget>
    )
}

const getTrendColor = (trend) => {
    if(trend == 1) return "#56b132";
    if(trend == -1) return "#ff5151";
    return "#dedede";
}

export default ExchangeRate;