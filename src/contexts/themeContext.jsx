import {createContext, useContext, useEffect, useState} from 'react';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({children}) => {
    const page = document.documentElement;
    const browserTheme = window.matchMedia('(prefers-color-scheme: light)');
    const persisted = JSON.parse(localStorage.getItem('preferences') || '{}');
    const [theme, setTheme] = useState(persisted && persisted.theme ?  persisted.theme : (browserTheme.matches ? 'light' : 'dark'));

    const stopTransition = () => {
        page.classList.add('no-transition');
        setTimeout(() => page.classList.remove('no-transition'), 100);
    };

    const savePreferences = () => {
        localStorage.setItem('preferences', JSON.stringify({theme}));
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        stopTransition();
    };

    const setAppHeight = () => {
        page.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    useEffect(() => {
        page.dataset.ratio = `${window.devicePixelRatio}`;
        setAppHeight();

        window.addEventListener('resize', setAppHeight);

        return () => {
            window.removeEventListener('resize', setAppHeight);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        savePreferences();

        window
            .matchMedia('(prefers-color-scheme: light)')
            .addEventListener('change', event => {
                event.matches ? setTheme('light') : setTheme('dark');
                stopTransition();
                savePreferences();
            })

        page.classList.toggle('dark', theme === 'dark');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);