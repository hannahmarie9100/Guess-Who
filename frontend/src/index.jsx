import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ErrorProvider } from './contexts/useErrorContext';

ReactDOM.render(
  <React.StrictMode>
    <ErrorProvider>
      <App />
    </ErrorProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
