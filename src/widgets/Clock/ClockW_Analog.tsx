import { useState, useEffect } from 'react';
import classes from './Clock.module.scss';
import Widget from '../../containers/Widget';
import { DateTime } from 'luxon';
import { WidgetInfo } from '../../common/util/types';

const Clock_Analog = ({ id, meta, content } : WidgetInfo) => {
    const { params, data } = content;
    const [rots, setRots] = useState({ hr: 0, min: 0, sec: 0 });

    useEffect(() => {
        const rotInterval = setInterval(() => {
            let dt = DateTime.local().setZone(params.tz);
            let hr = dt.hour;
            let min = dt.minute;
            let sec = dt.second;
            // setTime({ hr, min, sec});
            setRots({
                hr: hr * 360 / 12 + ((min * 360 / 60) / 12),
                min: (min * 360 / 60) + (sec * 360 / 60) / 60,
                sec: sec * 360 / 60,
            })
        }, 1000);

        return () => clearInterval(rotInterval);
    }, [params.tz])

    const rotations = {
        hr: { transform: `rotate(${rots.hr}deg)` },
        min: { transform: `rotate(${rots.min}deg)` },
        sec: { transform: `rotate(${rots.sec}deg)` }
    }

    return (
        <Widget
            id={id}
            meta={meta}
            className={classes.ClockAnalog}
        >
            <div className={classes.clockbox}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                    <g id="face">
                        <circle className={classes.circle} cx="300" cy="300" r="253.9" />
                        <path className={classes.hourMarks} d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6" />
                        <circle className={classes.midCircle} cx="300" cy="300" r="16.2" />
                    </g>
                    <g id="hour" className={classes.hand} style={rotations.hr}>
                        <path className={classes.hourArm} d="M300.5 298V142" />
                        <circle className={classes.sizingBox} cx="300" cy="300" r="253.9" />
                    </g>
                    <g id="minute" className={classes.hand} style={rotations.min}>
                        <path className={classes.minuteArm} d="M300.5 298V67" />
                        <circle className={classes.sizingBox} cx="300" cy="300" r="253.9" />
                    </g>
                    <g id="second" className={classes.hand} style={rotations.sec}>
                        <path className={classes.secondArm} d="M300.5 350V55" />
                        <circle className={classes.sizingBox} cx="300" cy="300" r="253.9" />
                    </g>
                </svg>
            </div>
            <div className={classes.label}>{params.label}</div>
        </Widget>
    )
}

export default Clock_Analog;