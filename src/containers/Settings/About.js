import React from 'react';
import FormTemplate from './FormTemplate';
import { Button } from '../../ui';
import GitHubLogo from '../../assets/GitHub-Mark-64px.png';

const About = () => {
    return (
        <FormTemplate
            title="About"
            subtitle="whois TableTop"
        >
            <h2>TableTop - Own your New Tab</h2>
            <p>TableTop is a macOS Dock inspired New Tab override.</p>
            <p>This is an open source project made <span role="img" aria-label="heart">❤️</span> in React.</p>
            <p>If you like this extension, please star it on GitHub. It would mean a lot to me <span role="img" aria-label="pleading face">🥺</span>.</p>
            <h3>How You Can Contribute?</h3>
            <p>This was created by me while I was trying out new things in React. I polished the app the best I could but there might be bugs.</p>
            <p>If you:</p>
            <ul>
                <li><p>find any bugs</p></li>
                <li><p>know ways to improve this</p></li>
                <li><p>have an idea for a widget or functionality,</p></li>
            </ul>
            <p>please fork the repository and send a PR.</p>
            <a 
                href="https://github.com/veeru153/tabletop" 
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
            >
                <Button style={styles.repoLink}>
                    <img src={GitHubLogo} alt="GitHub Mark" />
                    <p>GitHub Repository</p>
                </Button>
            </a>
        </FormTemplate>
    )
}

const styles = {
    repoLink: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        background: '#dedede',
        gap: 20,
        margin: '20px 0',
    }
}

export default About;