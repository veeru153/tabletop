import React, { useState, useEffect, useCallback } from 'react';
import classes from './PageShell.module.scss';
import { X, ArrowUp } from 'lucide-react';
import { NavContext } from '../../../common/util/contexts';


const PageShell = ({ visibility, setVisibility, children }) => {
    const [pageStack, setPageStack] = useState([children, ]);
    const [level, setLevel] = useState(pageStack.length);

    const upOneLevel = () => {
        if(level === 1) {
            setVisibility(false);
            return;
        }
        setLevel(Math.max(0, level-1));
        const upwardTimeout =  setTimeout(() => setPageStack(pageStack.slice(0, level-1)), 400);
        return () => clearTimeout(upwardTimeout);
    }

    const open = (page) => {
        if(!page) return;
        const tmpPageStack  = [...pageStack];
        tmpPageStack.push(page)
        setPageStack(tmpPageStack);
        setLevel(tmpPageStack.length);
    }

    const close = () => {
        setVisibility(false);
    }

    const onEscPress = useCallback((e) => {
        if(visibility) {
            if(e.key === "Escape") {
                if(level === 1) setVisibility(false);
                else upOneLevel();
            }
        }
    }, []);
    
    useEffect(() => {
        document.addEventListener("keydown", onEscPress);
        return () =>  document.removeEventListener("keydown", onEscPress);
    }, [visibility, level])

    // Set Level to 0 when Settings are closed/opened
    useEffect(() => {
        const backToRoot = setTimeout(() => setPageStack([children]), 400);
        setLevel(1);
        return () => clearTimeout(backToRoot);
    }, [visibility]);

    const LeftSide = () => (
        <div
            className={classes.sides}
            style={{ justifyContent: 'flex-end' }}
        >
            <button
                className={classes.uiBtns}
                style={{ margin: '0 20px', display: (level === 0) ? 'none' : 'block' }}
                onClick={upOneLevel}
            >
                <ArrowUp size={42} color="#dedede" />
            </button>
        </div>
    )

    const RightSide = () => (
        <div className={classes.sides}>
            <button
                className={classes.uiBtns}
                onClick={close}
            >
                <X size={42} color="#dedede" />
            </button>
        </div>
    )

    return (
        <div className={classes.PageShell}>
            {(level > 1) ? <LeftSide /> : null}
            <NavContext.Provider value={{ open, close }}>
                <div 
                    className={classes.main}
                    style={{ transform: `translateY(${-(level-1)*100}vh)` }}
                >
                    {pageStack.map((page, i) => React.cloneElement(page, { key: i }))}
                </div>
            </NavContext.Provider>
            <RightSide />
        </div>
    )
}

export default PageShell;