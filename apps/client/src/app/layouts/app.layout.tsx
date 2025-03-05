import {
  Sidebar,
  StackedLayout,
} from '@transaction-monitoring/client-components';
import { FunctionComponent } from 'react';
import { useOutlet } from 'react-router-dom';

import NavbarComponent from '../components/navbar.component';

const AppLayout: FunctionComponent = function ({}) {
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
