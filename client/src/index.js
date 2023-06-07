import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "state"
import { Provider } from "react-redux";
import { postApi } from 'state/api';
import { setupListeners } from '@reduxjs/toolkit/query/react';


const store = configureStore({
  reducer: {
    global: globalReducer,
    postsApi: postApi.reducer,
  }, middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(postApi.middleware),

})

setupListeners(store.dispatch);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
