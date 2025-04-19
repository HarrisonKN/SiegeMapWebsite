import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import './styles.css';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure 'root' matches the id in index.html
root.render(
  <React.StrictMode>
    <AppProvider>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </AppProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
