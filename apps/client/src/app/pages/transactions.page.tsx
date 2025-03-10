import { Text } from '@transaction-monitoring/client-components';
import {
  FunctionComponent,
  useCallback,
  useState,
} from 'react';

import {
  SortingEnum,
  useTransactionsConnectionQuery,
} from '../../utils/generated';
import LoaderComponent from '../components/loaders.component';
import TransactionsTableComponent from '../components/tables/transactionsTable.component';
import NextPreviousPagination from '../layouts/nextPreviousPagination.layout';

const TransactionPage: FunctionComponent = function () {
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const { data, loading, error, refetch, fetchMore } =
    useTransactionsConnectionQuery({
      variables: {
        offset,
        limit,
        sorting: {
          createdAt: SortingEnum.Desc,
        },
      },
    });

  const handlePageUpdate = useCallback(
    async (page: number) => {
      await fetchMore({
        variables: { offset: page * limit },
      });
      setOffset(page * limit);
    },
    []
  );

  if (loading) {
    return <LoaderComponent />;
  }

  if (error || !data) {
    //TODO: make an error component
    return <div>Error</div>;
  }

  const transactions = data.transactionsConnection.items;
  const total = data.transactionsConnection.count;

  if (total === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-y-8 min-h-svh">
        <Text>No transactions exisiting yet</Text>
      </div>
    );
  }

  return (
    <NextPreviousPagination
      size={total}
      limit={limit}
      onUpdatePage={handlePageUpdate}
    >
      <div className="flex w-full justify-end mb-8">
        <span className="dark:text-zinc-200">
          Total transactions: {total}
        </span>
      </div>
      <TransactionsTableComponent
        transactions={transactions}
      />
    </NextPreviousPagination>
  );
};

export default TransactionPage;
