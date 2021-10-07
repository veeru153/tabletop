import React from 'react';
import { Button, Page } from '../../common/ui';

const DownloadPage = () => {
    return (
        <Page
            title="Download TableTop"
            subtitle="Your New Tab needs a revamp."
            style={styles.page}
        >
            <h3>For more widgets, download TableTop.</h3>
            <Button
                onClick={() => window.open("https://github.com/veeru153/tabletop/releases", "_blank")}
                style={styles.btn}
            >Download</Button>
        </Page>
    )
}

const styles = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    btn: {
        margin: '64px auto',
    },
}

export default DownloadPage;