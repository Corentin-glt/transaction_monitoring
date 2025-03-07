import { Text } from '@transaction-monitoring/client-components';
import {
  FunctionComponent,
  useCallback,
  useState,
} from 'react';

import {
  Scenario,
  SortingEnum,
  useScenariosConnectionQuery,
} from '../../utils/generated';
import LoaderComponent from '../components/loaders.component';
import ScenariosTableComponent from '../components/tables/scenariosTable.component';
import NextPreviousPagination from '../layouts/nextPreviousPagination.layout';

const ScenariosPage: FunctionComponent = function () {
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const { data, loading, error, refetch, fetchMore } =
    useScenariosConnectionQuery({
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
    //TODO: make a loader component
    return <LoaderComponent />;
  }

  if (error || !data) {
    //TODO: make an error component
    return <div>Error</div>;
  }

  const scenarios = data.scenariosConnection.items;
  const total = data.scenariosConnection.count;

  if (total === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-y-8 min-h-svh">
        <Text>No scenarios exisiting yet</Text>
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
          Total scenarios: {total}
        </span>
      </div>
      <ScenariosTableComponent
        scenarios={scenarios as Scenario[]}
      />
    </NextPreviousPagination>
  );
};

export default ScenariosPage;
