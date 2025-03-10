import {
  Sidebar,
  StackedLayout,
} from '@transaction-monitoring/client-components';
import { FunctionComponent, useEffect } from 'react';
import { useOutlet } from 'react-router-dom';

import {
  useAlertsCreatedSuccessSubscription,
  useBulkTransactionsSuccessSubscription,
} from '../../utils/generated';
import { ToastIntent } from '../../utils/providers/toasts/toastProvider';
import { useToast } from '../../utils/providers/toasts/toastService';
import NavbarComponent from '../components/navbar.component';

const AppLayout: FunctionComponent = function () {
  const toast = useToast();
  const { data } = useBulkTransactionsSuccessSubscription();

  const { data: alertSubscriptionData } =
    useAlertsCreatedSuccessSubscription();

  useEffect(() => {
    if (data) {
      toast.open({
        intent: ToastIntent.SUCCESS,
        title: `${data.bulkTransactionsSuccess.message}\nPlease to refresh the transactions page`,
      });
    }

    if (alertSubscriptionData) {
      toast.open({
        intent: ToastIntent.SUCCESS,
        title: `${alertSubscriptionData.alertsCreatedSuccess.message}\nPlease to refresh the alerts page`,
      });
    }
  }, [data, alertSubscriptionData]);

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
