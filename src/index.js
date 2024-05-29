import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux'
import bookSlice from './features/bookSlice';
import userSlice from './features/userSlice';
import markSlice from './features/markSlice';
import testSlice from './features/testSlice';
import lessonSlice from './features/lessonSlice';
import flyerSlice from './features/flyerSlice';


const store = configureStore({
  reducer:{
      book:bookSlice,
      lesson:lessonSlice,
      flyer:flyerSlice,
      users:userSlice,
      marks:markSlice,
      test:testSlice,
  }
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
