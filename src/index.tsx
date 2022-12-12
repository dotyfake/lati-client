import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './style/index.css'
import './style/grid.css'
import 'animate.css';
import { PersistGate } from 'redux-persist/integration/react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { BrowserRouter as Router } from 'react-router-dom';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <PersistGate persistor={persistor} >
          <SkeletonTheme baseColor="#eeecec" highlightColor="#cfcdcd">
            <App />
          </SkeletonTheme>
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
