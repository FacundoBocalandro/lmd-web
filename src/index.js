import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./store";
import "./index.css"
import "./styles/main.css"
import SnackbarProvider from 'react-simple-snackbar';

ReactDOM.render(
    <React.StrictMode>
        <SnackbarProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </SnackbarProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
