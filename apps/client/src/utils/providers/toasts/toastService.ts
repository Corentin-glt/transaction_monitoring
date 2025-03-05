import { createContext, useContext } from 'react';

export type ToastContextType = {
  open: (params: any, timeout?: number) => void;
  close: (id: string) => void;
};

const ToastContext = createContext<ToastContextType>({} as ToastContextType);
export const useToast = () => useContext(ToastContext);

export default ToastContext;
