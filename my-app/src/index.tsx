import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const client = new QueryClient()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <QueryClientProvider client={client}>
        <Router>
            <App/>
        </Router>
    </QueryClientProvider>
);