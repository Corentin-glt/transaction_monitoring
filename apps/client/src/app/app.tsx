import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import AppLayout from './layouts/app.layout';
import AddRulePage from './pages/addRule.page';
import AddTransactionsPage from './pages/addTransactions.page';
import AlertsPage from './pages/alerts.page';
import RulePage from './pages/rule.page';
import RulesPage from './pages/rules.page';
import TransactionsPage from './pages/transactions.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <TransactionsPage />,
      },
      {
        path: '/rules',
        element: <RulesPage />,
      },
      {
        path: '/alerts',
        element: <AlertsPage />,
      },
      {
        path: '/addTransactions',
        element: <AddTransactionsPage />,
      },
      {
        path: '/addRule',
        element: <AddRulePage />,
      },
      {
        path: '/rule/:id',
        element: <RulePage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
