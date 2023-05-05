import React from 'react';
import ReactDOM from 'react-dom/client';
import { JournalApp } from './JournalApp';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
  </React.StrictMode>,
)
