import classes from './Page.module.scss';

// Container for all Settings and config pages
const Page = ({ title, subtitle, children, className: userClasses, style: userStyles }: PageProps) => {
    return (
        <div className={classes.Page}>
            <header>
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
            </header>
            <section className={userClasses} style={userStyles}>
                {children}
            </section>
        </div>
    )
}

interface PageProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default Page;