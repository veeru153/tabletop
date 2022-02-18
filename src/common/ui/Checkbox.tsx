import { useState, useEffect } from 'react';
import classes from './Checkbox.module.scss'
import { Square, CheckSquare } from 'react-feather';

const Checkbox = ({ children, checked : controlledCheck, onClick : clicked, className : userClasses, style : userStyles } : CheckboxProps) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        (controlledCheck != null) && setChecked(controlledCheck);
    }, [controlledCheck]);

    const handleCheck = () => {
        if(clicked != null) {
            clicked();
            return;
        }

        setChecked(!checked);
    }

    return (
        <div 
            className={`${classes.Checkbox} ${userClasses ?? ""}`}
            style={userStyles}
            onClick={handleCheck}
        >
            {checked ? <CheckSquare style={styles.checkbox} /> : <Square style={styles.checkbox} />}
            <h4>{children}</h4>
        </div>
    )
}

interface CheckboxProps {
    children: React.ReactChildren,
    checked: boolean,
    onClick: Function,
    className: string,
    style: React.CSSProperties,
}

const styles = {
    checkbox: {
        minWidth: 24,
        minHeight: 24,
    }
}

export default Checkbox;
