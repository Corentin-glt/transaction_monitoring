import {
  Sidebar,
  StackedLayout,
} from '@transaction-monitoring/client-components';
import { FunctionComponent } from 'react';
import { useOutlet } from 'react-router-dom';

import {
  useAlertsCreatedSuccessSubscription,
  useBulkTransactionsSuccessSubscription,
} from '../../utils/generated';
import { ToastIntent } from '../../utils/providers/toasts/toastProvider';
import { useToast } from '../../utils/providers/toasts/toastService';
import NavbarComponent from '../components/navbar.component';

const AppLayout: FunctionComponent = function ({}) {
  const toast = useToast();
  const { data } = useBulkTransactionsSuccessSubscription({
    onComplete() {
      toast.open({
        intent: ToastIntent.SUCCESS,
        title: data?.bulkTransactionsSuccess.message,
      });
    },
  });

  const { data: alertSubscriptionData } =
    useAlertsCreatedSuccessSubscription({
      onComplete() {
        toast.open({
          intent: ToastIntent.SUCCESS,
          title:
            alertSubscriptionData?.alertsCreatedSuccess
              .message,
        });
      },
    });
  const outlet = useOutlet();
  return (
    <StackedLayout
      navbar={<NavbarComponent />}
      sidebar={<Sidebar />}
    >
      {outlet}
    </StackedLayout>
  );
};

export default AppLayout;
