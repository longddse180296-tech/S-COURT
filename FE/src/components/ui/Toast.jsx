import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 w-full max-w-[340px] pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle2 className="text-emerald-500" size={18} strokeWidth={2.4} />,
    warning: <AlertTriangle className="text-amber-500" size={18} strokeWidth={2.4} />,
    error: <XCircle className="text-red-500" size={18} strokeWidth={2.4} />,
    info: <Info className="text-blue-500" size={18} strokeWidth={2.4} />,
  };

  const bgColors = {
    success: 'bg-white border-emerald-100/80',
    warning: 'bg-white border-amber-100/80',
    error: 'bg-white border-red-100/80',
    info: 'bg-white border-blue-100/80',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      className={`
        pointer-events-auto
        flex
        items-start
        gap-3
        p-4
        rounded-xl
        border
        shadow-premium
        ${bgColors[type]}
      `}
      role="alert"
    >
      <span className="mt-0.5 flex-shrink-0">{icons[type]}</span>
      <p className="flex-1 text-[13px] font-semibold text-slate-800 leading-tight">
        {message}
      </p>
      <button
        onClick={onClose}
        className="mt-0.5 text-slate-400 hover:text-slate-600 focus:outline-none flex-shrink-0"
        aria-label="Close notification"
      >
        <X size={14} strokeWidth={2.4} />
      </button>
    </motion.div>
  );
};
