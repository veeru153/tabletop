import classes from './Dropdown.module.scss';

const Dropdown = ({ name, onChange, style, value, defaultValue, options }: DropdownProps) => {
    return (
        <select
            id={name}
            name={name}
            className={classes.Dropdown}
            onChange={(e) => onChange(e)}
            style={style}
            value={value}
            defaultValue={defaultValue}
        >
            {options.map((opt) => {
                const label = opt.label ?? opt;
                const val = opt.value ?? opt;
                return <option key={val} value={val}>{label}</option>
            })}
        </select>
    )
}

interface DropdownProps {
    name: string;
    onChange: Function;
    style?: React.CSSProperties;
    value?: string;
    defaultValue?: string;
    options: DropdownOption[];
}

interface DropdownOption {
    label: string;
    value: any;
}

export default Dropdown;