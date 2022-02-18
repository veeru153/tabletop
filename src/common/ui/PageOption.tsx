import classes from './Page.module.scss';

// Option for Settings Pages
const PageOption = ({ name, icon, next = () => { } }: PageOptionProps) => {
    return (
        <div className={classes.Option} onClick={() => next()}>
            <div>{icon}</div>
            <h2>{name}</h2>
        </div>
    )
}

interface PageOptionProps {
    name: string;
    icon: React.ReactNode;
    next: Function;
}

export default PageOption;