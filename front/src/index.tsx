import React from 'react';
import ReactDOM from "react-dom/client";
import App from './backend/theme/App';
import { Provider } from 'react-redux'
import Context, { AppProvider } from './core/context'
import app from "./core/state/theme";
import store from './core/state/store';
import { BrowserRouter as Router } from 'react-router-dom';

const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (e) {
        return undefined;
    }
}

store.subscribe(() => {
     const state = store.getState();
     saveState(state);
    console.log(state, 'state===================')
})

const container = document.getElementById('dev-application')!;
const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <AppProvider value={{ app }}>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </AppProvider>

    </React.StrictMode>
);