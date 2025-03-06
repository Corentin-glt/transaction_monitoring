import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateTransactionsMutation } from '../../utils/generated';
import { ToastIntent } from '../../utils/providers/toasts/toastProvider';
import { useToast } from '../../utils/providers/toasts/toastService';
import CreateTransactionsForm from '../components/forms/createTransactionsForm.component';

const AddTransactionsPage: FunctionComponent = function () {
  const toast = useToast();
  const navigate = useNavigate();
  const [createWorksite, { loading }] =
    useCreateTransactionsMutation({
      onCompleted() {
        toast.open({
          intent: ToastIntent.SUCCESS,
          title: 'Transactions Bulk done with success',
        });
        navigate('/');
      },
      refetchQueries: ['TransactionsConnection']
    });

  return (
    <div>
      <CreateTransactionsForm
        onSubmit={(data) =>
          createWorksite({
            variables: {
              input: {
                ...data,
              },
            },
          })
        }
      />
    </div>
  );
};

export default AddTransactionsPage;
