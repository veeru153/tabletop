import classes from './Radio.module.scss'

const Radio = (props: RadioProps) => {
    return (
        <div className={classes.Radio}>
            <label className={props.checked ? classes.active : ""} style={props.style}>
                <input
                    type="radio"
                    {...props}
                />
                {props.label}
            </label>
        </div>
    )
}

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export default Radio;