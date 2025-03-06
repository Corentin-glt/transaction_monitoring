import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateRuleMutation } from '../../utils/generated';
import { ToastIntent } from '../../utils/providers/toasts/toastProvider';
import { useToast } from '../../utils/providers/toasts/toastService';
import CreateRuleForm from '../components/forms/createRuleForm.component';

const AddRulePage: FunctionComponent = function () {
  const toast = useToast();
  const navigate = useNavigate();
  const [createRule, { loading }] = useCreateRuleMutation({
    onCompleted() {
      toast.open({
        intent: ToastIntent.SUCCESS,
        title: 'Rule creation has been done with success',
      });
      navigate('/rules');
    },
    refetchQueries: ['TransactionsConnection'],
  });

  return (
    <div>
      <CreateRuleForm
        onSubmit={(data) =>
          createRule({
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

export default AddRulePage;
