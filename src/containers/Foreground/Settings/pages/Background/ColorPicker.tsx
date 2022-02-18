import classes from './Background.module.scss';

const ColorPicker = (props) => {
    return (
        <div className={classes.colorPicker}>
            <input
                type="color"
                id="bgColor"
                name="bgColor"
                value={props.values.color}
                onChange={(e) => props.setFieldValue('color', e.target.value)}
            />
        </div>
    )
}

export default ColorPicker;