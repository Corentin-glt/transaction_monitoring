import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

import {
  Alert,
  useAlertQuery,
} from '../../utils/generated';
import LoaderComponent from '../components/loaders.component';
import PresentAttributeComponent from '../components/presentAttribute.component';
import TransactionsTableComponent from '../components/tables/transactionsTable.component';

const AlertPage: FunctionComponent = function () {
  const { id } = useParams() as { id: string };
  const { data, loading, error } = useAlertQuery({
    variables: { alertId: id },
  });

  if (error) {
    return <div>Erreur</div>;
  }

  if (loading) {
    return <LoaderComponent />;
  }

  const alert = data?.alert as Alert;

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-3 ">
        <PresentAttributeComponent
          label="Scenario"
          value={alert.scenario.name}
        />
        <PresentAttributeComponent
          label="Rule"
          value={alert.rule.name}
        />

        <PresentAttributeComponent
          label="Creation date"
          value={new Date(
            alert.createdAt
          ).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        />
      </div>
      {alert.transactions &&
      alert.transactions.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold dark:text-zinc-200 text-zinc-950/50">
            Transactions
          </h2>
          <TransactionsTableComponent
            transactions={alert.transactions}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AlertPage;
