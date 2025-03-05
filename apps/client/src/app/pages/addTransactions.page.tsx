import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import CreateTransactionsForm from '../components/forms/createTransactionsForm.component';

const AddTransactionsPage: FunctionComponent = function () {
  const navigate = useNavigate();
  return (
    <div>
      <CreateTransactionsForm
        onSubmit={() => navigate('/')}
      />
    </div>
  );
};

export default AddTransactionsPage;
