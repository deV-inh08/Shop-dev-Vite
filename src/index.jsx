import React from 'react';
import ReactDOM from "react-dom"
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@contexts/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
);
