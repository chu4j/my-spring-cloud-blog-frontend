import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './css/index.css';
import BlogRouter from './router/Router';
import  'github-markdown-css';
ReactDOM.render(<
    BrowserRouter forceRefresh={true} >
    <BlogRouter />
</BrowserRouter>,
    document.getElementById('root')
);