import { Text } from '@transaction-monitoring/client-components';
import {
  FunctionComponent,
  useCallback,
  useState,
} from 'react';

import {
  Alert,
  SortingEnum,
  useAlertsConnectionQuery,
} from '../../utils/generated';
import LoaderComponent from '../components/loaders.component';
import AlertsTableComponent from '../components/tables/alertsTable.component';
import NextPreviousPagination from '../layouts/nextPreviousPagination.layout';

const AlertsPage: FunctionComponent = function ({}) {
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const { data, loading, error, fetchMore } =
    useAlertsConnectionQuery({
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

  const alerts = data.alertsConnection.items;
  const total = data.alertsConnection.count;

  if (total === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-y-8 min-h-svh">
        <Text>No alerts exisiting yet</Text>
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
          Total alerts: {total}
        </span>
      </div>
      <AlertsTableComponent alerts={alerts as Alert[]} />
    </NextPreviousPagination>
  );
};

export default AlertsPage;
