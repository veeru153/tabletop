import React, { useContext } from 'react';
import { ConfigContext } from '../../util/contexts';
import classes from './Settings.module.css';
import FormTemplate from './FormTemplate.js'


const RemoveWidgetForm = () => {
    const { widgets } = useContext(ConfigContext);
    return (
        <FormTemplate
            title="Remove Widget"
            subtitle="Choose a Widget:"
            // formClasses={classes.Settings}
        >
            {widgets.map(w => <WidgetRow key={w.key} id={w.key} data={w.data} />)}
        </FormTemplate>
    )
}

const WidgetRow = ({ id, data }) => {
    const { removeWidget } = useContext(ConfigContext);
    const { meta } = data;
    const qTable = Object.entries(meta.q);
    return (
        <div className={classes.removeRow}>
            <div><p>{meta.type.toUpperCase()}</p></div>
            <div className={classes.rowQ}>
                {qTable.map(q => (
                    <div>
                        <p className={classes.rowKey}>{q[0]}</p>
                        <p className={classes.rowVal}>{q[1]}</p>
                    </div>
                ))}
            </div>
            <div><button onClick={() => removeWidget(id)}>Delete</button></div>
        </div>
    )
}

export default RemoveWidgetForm;