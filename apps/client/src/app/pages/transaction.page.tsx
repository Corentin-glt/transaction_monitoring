import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

import { displayCurrencyType } from '../../utils/displayCurrency';
import {
  Transaction,
  useTransactionQuery,
} from '../../utils/generated';
import LoaderComponent from '../components/loaders.component';
import PresentAttributeComponent from '../components/presentAttribute.component';
import AlertsTableComponent from '../components/tables/alertsTable.component';

const TransactionPage: FunctionComponent = function ({}) {
  const { id } = useParams() as { id: string };
  const { data, loading, error } = useTransactionQuery({
    variables: { transactionId: id },
  });

  if (error) {
    return <div>Erreur</div>;
  }

  if (loading) {
    return <LoaderComponent />;
  }

  const transaction = data?.transaction as Transaction;
  const { label, symbol } = displayCurrencyType(
    transaction.currency
  );
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-3 gap-4">
        <PresentAttributeComponent
          label="Source account"
          value={transaction.sourceAccount}
        />
        <PresentAttributeComponent
          label="Target account"
          value={transaction.targetAccount}
        />
        <PresentAttributeComponent
          label="External ID"
          value={transaction.externalId}
        />
        <PresentAttributeComponent
          label="Creation date"
          value={new Date(
            transaction.createdAt
          ).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        />
        <PresentAttributeComponent
          label="Currency"
          value={label}
        />
        <PresentAttributeComponent
          label="Amount"
          value={`${transaction.amount} ${symbol}`}
        />
      </div>
      {transaction.alerts &&
      transaction.alerts.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold dark:text-zinc-200 text-zinc-950/50">
            Alerts
          </h2>
          <AlertsTableComponent
            disableTransaction
            alerts={transaction.alerts}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TransactionPage;
