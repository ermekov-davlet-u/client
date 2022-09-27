import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./utils/i18next"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);
root.render(
  <Suspense fallback={<Loader/>}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>
);

reportWebVitals();
