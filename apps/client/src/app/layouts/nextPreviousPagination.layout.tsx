import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@transaction-monitoring/client-components';
import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

interface NextPreviousPaginationProps
  extends PropsWithChildren {
  limit: number;
  size: number;
  onUpdatePage: (page: number) => void;
}

const NextPreviousPagination: FunctionComponent<NextPreviousPaginationProps> =
  function ({ limit, size, children, onUpdatePage }) {
    const [activePage, setActivePage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
      const totalPage = Math.ceil(size / limit);
      setTotalPage(totalPage);
    }, [size, limit]);

    const handlePageChange = (page: number) => {
      setActivePage(page);
      onUpdatePage(page);
    };

    return (
      <div className="flex flex-col p-4">
        <div className="flex-1 overflow-auto">{children}</div>
        <div className="mt-8">
          <Pagination className="flex justify-center items-center space-x-2">
            <PaginationPrevious
              onClick={() =>
                handlePageChange(activePage - 1)
              }
              disabled={activePage === 0}
              className="disabled:opacity-50 hover:cursor-pointer"
            />
            <PaginationList className="flex space-x-2">
              <PaginationPage
                current
                className="font-bold"
              >
                {activePage + 1}
              </PaginationPage>
            </PaginationList>
            <PaginationNext
              disabled={totalPage - 1 === activePage}
              onClick={() =>
                handlePageChange(activePage + 1)
              }
              className="disabled:opacity-50 hover:cursor-pointer"
            />
          </Pagination>
        </div>
      </div>
    );
  };

export default NextPreviousPagination;
