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
                className="absolute -top-2  rounded right-0 p-1 bg-white text-badoit"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>

              {intent === ToastIntent.ERROR ? (
                <div className="flex gap-2 bg-red-400 text-red-800 p-4 rounded-md shadow-md">
                  <ExclamationCircleIcon className="h-6 w-6" />
                  <div className="flex flex-col">
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm">{message}</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2  text-white p-4 rounded-md shadow-md bg-badoit">
                  <CheckBadgeIcon className="h-6 w-6" />
                  <div className="flex flex-col">
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm">{message}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ToastContext.Provider>
    );
  };

export default ToastProvider;
