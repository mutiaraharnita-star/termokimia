import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/manrope';
import '@fontsource-variable/lora';
import '@fontsource-variable/lora/wght-italic.css';
import App from './App.jsx';
import './styles/main.css';
import './styles/app.css';
import './styles/home.css';
import './styles/adventure.css';
import './styles/interior-adventure.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

