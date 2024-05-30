import React, {Suspense} from 'react';
import './index.css';
import App from './App';
import Loader from "./layouts/Loader";
import {HashRouter} from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {persistor, store} from "./_store/_slices";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <Suspense fallback={<Loader/>}>
        <HashRouter>
            <React.StrictMode>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App/>
                    </PersistGate>
                </Provider>
            </React.StrictMode>
        </HashRouter>
    </Suspense>
);
