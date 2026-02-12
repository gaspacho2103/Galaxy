import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query'; // Добавьте этот импорт
import App from './App';
import { ThemeProvider } from './ThemeContext';
import { queryClient } from './queryClient';
import { ToastProvider } from './ToastContext';
import './components/toast.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);