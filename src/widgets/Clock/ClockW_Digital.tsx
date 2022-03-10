import { useState, useEffect } from 'react';
import classes from './Clock.module.scss';
import { DateTime } from 'luxon';
import { WidgetProps } from '../../common/util/types';


const Clock = ({ content } : WidgetProps) => {
    const { params, data } = content;
    // const [time, setTime] = useState({ hr: "00", min: "00", sec: "00" });
    const [time, setTime] = useState({ hr: "00", min: "00" });
    const [am, setAm] = useState(true);

    useEffect(() => {
        const secInterval = setInterval(() => {
            let dt = DateTime.local().setZone(params.tz);
            let _hr = params.military ? dt.hour : dt.hour % 12;
            let hr = `${_hr}`.padStart(2,"0");
            let min = `${dt.minute}`.padStart(2,"0");
            // let sec = `${dt.second}`.padStart(2,"0");
            // setTime({ hr, min, sec });

            setTime({ hr, min });
            setAm(dt.hour < 12);
        }, 1000);

        return () => clearInterval(secInterval);
    }, [params.tz])

    return (
        <div className={classes.ClockDigital}>
            {/* <div>{time.hr}:{time.min}:{time:sec} <span style={{ display: params.military ? "none" : "inline-block" }}>{am ? "AM" : "PM"}</span></div> */}
            <div>{time.hr}:{time.min} <span style={{ display: params.military ? "none" : "inline-block" }}>{am ? "AM" : "PM"}</span></div>
            <div className={classes.label}>{params.label}</div>
        </div>
    )
}

export default Clock;