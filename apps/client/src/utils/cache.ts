import { makeVar } from '@apollo/client';

import { ToastIntent } from './providers/toasts/toastProvider';

export interface Toast {
  id: string | number;
  intent: ToastIntent;
  message: string;
  title: string;
}

export const toastsVar = makeVar<Toast[]>([]);
