import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import HowToPlay from './components/HowToPlay';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <HowToPlay />
    <App />
  </>
);
