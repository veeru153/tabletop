import React, { useState, useContext } from 'react';
import classes from './Quotes.module.scss';
import { ConfigContext, NavContext } from '../../common/util/contexts';
import { TextInput, Button, Page } from '../../common/ui';
import widget from './';

const QuotesForm = () => {
    const { addWidget } = useContext(ConfigContext);
    const { close } = useContext(NavContext);
    const [tags, setTags] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addWidget(widget.type, { tags });
        close();
    }
    
    return (
        <Page
            title="Add Widget : Quotes"
            subtitle='"Words you speak or spoke, will live forever." - Auliq Ice'
            className={classes.QuotesForm}
        >
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={{ width: "100%" }}>
                    <h3>Tag Guide:</h3> 
                    <h4>- <code>table,top</code> finds quotes matching tags "table" AND "top"</h4>
                    <h4>- <code>table|top</code> finds quotes matching tags "table" OR "top"</h4>
                </div>
                <div className={classes.inputArea}>
                    <TextInput
                        name="value"
                        placeholder="Add Tags (Optional)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        style={styles.textInput}
                    />
                </div>
                <Button
                    type="submit"
                    style={styles.btn}
                >Submit</Button>
            </form>
        </Page>
    )
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
    },
    textInput: {
        fontSize: 22,
        paddingBottom: 5,
        width: 'inherit',
    },
    btn: {
        margin: '64px auto',
    },
}

export default QuotesForm;