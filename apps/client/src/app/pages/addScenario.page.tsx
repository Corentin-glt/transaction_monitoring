import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateScenarioMutation } from '../../utils/generated';
import { ToastIntent } from '../../utils/providers/toasts/toastProvider';
import { useToast } from '../../utils/providers/toasts/toastService';
import ScenarioForm from '../components/forms/scenarioForm.component';

const AddScenarioPage: FunctionComponent = function () {
  const toast = useToast();
  const navigate = useNavigate();
  const [createScenario, { loading }] =
    useCreateScenarioMutation({
      onCompleted() {
        toast.open({
          intent: ToastIntent.SUCCESS,
          title:
            'Scenario creation has been done with success',
        });
        navigate('/scenarios');
      },
      refetchQueries: ['ScenariosConnection', 'RulesConnection'],
    });

  return (
    <ScenarioForm
      loading={loading}
      onSubmit={(data) =>
        createScenario({
          variables: {
            input: {
              ...data,
            },
          },
        })
      }
    />
  );
};

export default AddScenarioPage;
