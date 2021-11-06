import React from 'react';
import Widget from '../../containers/Widget';
import classes from './Todo.module.scss';
import { Plus, CheckCircle } from 'react-feather';
import { DateTime } from 'luxon';

/** Instructions on use:
 * 3. Complete the widget component below.
 * 5. Remove all template comments from NewWidget before sending PR.
 */

const DUMMY = [
    {
        ts: 1,
        title: "List Item",
        done: false,
    },
    {
        ts: 1,
        title: "List Item",
        done: false,
    },
    {
        ts: 1,
        title: "List Item",
        done: false,
    },
    {
        ts: 1,
        title: "List Item",
        done: false,
    },
    {
        ts: 1,
        title: "List Item",
        done: false,
    },
    {
        ts: 1,
        title: "List Item",
        done: false,
    },
    {
        ts: 1,
        title: "List Item",
        done: false,
    },
    {
        ts: 1,
        title: "List Item",
        done: false,
    },
    {
        ts: 1,
        title: "List Item",
        done: false,
    },
    {
        ts: 1,
        title: "List Item",
        done: false,
    },
]


const Todo = ({ id, meta, content }) => {
    return (
        <Widget
            id={id}
            meta={meta}
            className={classes.Todo}
        >
            <div className={classes.header}>
                <p>To Do</p>
                <Plus size={28} />
            </div>
            <div className={classes.list}>
                {DUMMY.map(i => {
                    return (
                        <ListItem {...i} />
                    )
                })}
            </div>
        </Widget>
    )
}

const ListItem = ({ ts, title, done }) => {
    const TIME_FORMAT_12 = "h:mm a"
    const TIME_FORMAT_24 = "H:mm"
    const DATE_FORMAT = "L LLL yyyy";
    // const FORMAT = 

    return (
        <div className={classes.listItem}>
            <div>
                <p>{title}</p>
                <span>{DateTime.fromMillis(ts).toFormat()}</span>
            </div>
            <div>
                <CheckCircle />
            </div>
        </div>
    )
}

export default Todo;