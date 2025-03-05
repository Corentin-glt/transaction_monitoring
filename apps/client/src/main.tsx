import { ApolloProvider } from '@apollo/client';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import client from './apolloClient';
import App from './app/app';
import ToastProvider from './utils/providers/toasts/toastProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ToastProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ToastProvider>
  </StrictMode>
);
