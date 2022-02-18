import classes from './Button.module.scss';

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} disabled={props.disabled} className={classes.Button} style={props.style}>
            {props.children}
        </button>
    )
}

export default Button;