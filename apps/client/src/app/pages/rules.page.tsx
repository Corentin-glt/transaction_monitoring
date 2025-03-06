import { Text } from '@transaction-monitoring/client-components';
import {
  FunctionComponent,
  useCallback,
  useState,
} from 'react';

import {
  SortingEnum,
  useRulesConnectionQuery,
} from '../../utils/generated';
import RulesTableComponent from '../components/tables/rulesTable.component';
import NextPreviousPagination from '../layouts/nextPreviousPagination.layout';

const RulesPage: FunctionComponent = function ({}) {
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const { data, loading, error, refetch, fetchMore } =
    useRulesConnectionQuery({
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
    return <div>loading</div>;
  }

  if (error || !data) {
    //TODO: make an error component
    return <div>Error</div>;
  }

  const rules = data.rulesConnection.items;
  const total = data.rulesConnection.count;

  if (total === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-y-8 min-h-svh">
        <Text>No rules exisiting yet</Text>
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
          Total rules: {total}
        </span>
      </div>
      <RulesTableComponent rules={rules} />
    </NextPreviousPagination>
  );
};

export default RulesPage;
