import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css';
import persistedReducer from "./store"
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'redux';
import {persistStore} from "redux-persist"
import { CookiesProvider } from 'react-cookie';

const store = createStore(persistedReducer);
const persistor = persistStore(store);

ReactDOM.render(
  
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
    </PersistGate>
    </Provider>
  ,
  document.getElementById('root')
);
