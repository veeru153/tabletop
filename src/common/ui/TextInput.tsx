import classes from './TextInput.module.scss';

const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input 
            className={classes.TextInput}
            type="text"
            autoComplete="off"
            {...props}
        />
    )
}

export default TextInput;