// context/ToastContext.jsx
import { createContext, useState } from 'react';

export const ToastContext = createContext();

function ToastNotification({ message, type, onClose }) {
  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>&times;</button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (messageOrObj, type = 'success') => {
    const id = Date.now();
    
    // Если первый аргумент - объект
    if (typeof messageOrObj === 'object' && messageOrObj !== null) {
      setToasts((prev) => [...prev, { id, ...messageOrObj }]);
    } 
    // Если два аргумента (сообщение и тип)
    else {
      setToasts((prev) => [...prev, { id, message: messageOrObj, type }]);
    }
    
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}