import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import AppLayout from './layouts/app.layout';
import AddRulePage from './pages/addRule.page';
import AddScenarioPage from './pages/addScenario.page';
import AddTransactionsPage from './pages/addTransactions.page';
import AlertPage from './pages/alert.page';
import AlertsPage from './pages/alerts.page';
import RulePage from './pages/rule.page';
import RulesPage from './pages/rules.page';
import ScenarioPage from './pages/scenario.page';
import ScenariosPage from './pages/scenarios.page';
import TransactionPage from './pages/transaction.page';
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
        path: '/scenarios',
        element: <ScenariosPage />,
      },
      {
        path: '/transactions/add',
        element: <AddTransactionsPage />,
      },
      {
        path: '/rules/add',
        element: <AddRulePage />,
      },
      {
        path: '/rules/:id',
        element: <RulePage />,
      },
      {
        path: '/scenarios/add',
        element: <AddScenarioPage />,
      },
      {
        path: '/scenarios/:id',
        element: <ScenarioPage />,
      },
      {
        path: '/alerts/:id',
        element: <AlertPage />,
      },
      {
        path: '/transactions/:id',
        element: <TransactionPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
