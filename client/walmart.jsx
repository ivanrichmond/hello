import React from 'react';

const MyPage = () => {
    const theme = useTheme();

    return (
        <>
            <input type='button' onClick={useTheme}>Change Theme</input>
            <div className={theme}>This is themed.</div>
        </>
    )
}

/**
 * On different pages, apply theme (dark vs light).
 * Button on top of pages called Change Theme, which switches.
 */
const useTheme = ({ theme }) => {
    const [theme, setTheme] = React.useState('light');

    if(theme === 'light'){
        setTheme('dark');
        return 'dark'
    } else {
        setTheme('light');
        return 'light'
    }
}