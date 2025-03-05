import { useReactiveVar } from '@apollo/client';
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { FunctionComponent } from 'react';

import ToastContext from './toastService';
import { toastsVar } from '../../cache';

export enum ToastIntent {
  SUCCESS,
  ERROR,
}
interface OpenToastParams {
  intent: ToastIntent;
  message: string;
  title: string;
}

const ToastProvider: FunctionComponent<React.PropsWithChildren> =
  function ({ children }) {
    const toasts = useReactiveVar(toastsVar);

    const open = (
      params: OpenToastParams,
      timeout = 5000
    ) => {
      const { intent, message, title } = params;
      const id = Date.now();
      toastsVar([
        ...toasts,
        { id, intent, message, title },
      ]);
      setTimeout(() => close(id), timeout);
    };

    const close = (id: string | number) =>
      toastsVar(toasts.filter((toast) => toast.id !== id));

    return (
      <ToastContext.Provider value={{ open, close }}>
        {children}
        <div className="space-y-2 absolute bottom-4 right-4 z-50">
          {toasts.map(({ id, intent, title, message }) => (
            <div
              key={id}
              className="relative"
            >
              <button
                onClick={() => close(id)}
                className="absolute top-2  right-2 p-1 bg-gray-200/20 text-gray-800/20"
              >
                <XMarkIcon className="h-2 w-2" />
              </button>

              {intent === ToastIntent.ERROR ? (
                <div
                  role="alert"
                  className="alert alert-error"
                >
                  <ExclamationCircleIcon className="h-6 w-6" />
                  <span>{message}</span>
                </div>
              ) : (
                <div
                  role="alert"
                  className="alert alert-success"
                >
                  <CheckBadgeIcon className="h-6 w-6" />
                  <span>{message}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </ToastContext.Provider>
    );
  };

export default ToastProvider;
