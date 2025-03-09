import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateTransactionsMutation } from '../../utils/generated';
import { ToastIntent } from '../../utils/providers/toasts/toastProvider';
import { useToast } from '../../utils/providers/toasts/toastService';
import CreateTransactionsForm from '../components/forms/createTransactionsForm.component';

const AddTransactionsPage: FunctionComponent = function () {
  const toast = useToast();
  const navigate = useNavigate();
  const [createTransactions] =
    useCreateTransactionsMutation({
      onCompleted(data) {
        toast.open({
          intent: ToastIntent.SUCCESS,
          title: data.createTransactions.message,
        });
        navigate('/');
      },
      refetchQueries: [
        'TransactionsConnection',
        'AlertsConnection',
      ],
    });

  return (
    <div>
      <CreateTransactionsForm
        onSubmit={(data) =>
          createTransactions({
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
