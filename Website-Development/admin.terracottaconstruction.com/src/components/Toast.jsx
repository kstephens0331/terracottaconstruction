// src/components/Toast.jsx
import { useState, useEffect } from 'react';
import { subscribe, removeNotification, styleConfig } from '../modules/notificationUtils';

// Icons for different notification types
const icons = {
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

export default function Toast() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Subscribe to notification changes
    const unsubscribe = subscribe(setNotifications);
    return unsubscribe;
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {notifications.map((notification) => {
        const style = styleConfig[notification.type] || styleConfig.info;

        return (
          <div
            key={notification.id}
            className={`${style.bg} ${style.border} border rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-in-out animate-slide-in`}
            role="alert"
          >
            <div className="flex items-start gap-3">
              <div className={style.icon}>
                {icons[notification.type]}
              </div>
              <div className="flex-1 min-w-0">
                {notification.title && (
                  <p className={`text-sm font-medium ${style.text}`}>
                    {notification.title}
                  </p>
                )}
                <p className={`text-sm ${style.text} ${notification.title ? 'mt-1' : ''}`}>
                  {notification.message}
                </p>
                {notification.action && (
                  <button
                    onClick={notification.action.onClick}
                    className={`mt-2 text-sm font-medium ${style.text} hover:underline`}
                  >
                    {notification.action.label}
                  </button>
                )}
              </div>
              {notification.dismissible && (
                <button
                  onClick={() => removeNotification(notification.id)}
                  className={`${style.text} hover:opacity-70 transition-opacity`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
