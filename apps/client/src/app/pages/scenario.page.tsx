import { FunctionComponent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Scenario,
  useScenarioQuery,
  useUpdateScenarioMutation,
} from '../../utils/generated';
import { ToastIntent } from '../../utils/providers/toasts/toastProvider';
import { useToast } from '../../utils/providers/toasts/toastService';
import DeleteScenarioButtonComponent from '../components/buttons/deleteScenarioButton.component';
import ScenarioForm from '../components/forms/scenarioForm.component';
import LoaderComponent from '../components/loaders.component';

const ScenarioPage: FunctionComponent = function ({}) {
  const { id } = useParams() as { id: string };
  const toast = useToast();
  const navigate = useNavigate();
  const { data, loading, error } = useScenarioQuery({
    variables: { scenarioId: id },
  });
  const [updateScenario, { loading: loadingMutation }] =
    useUpdateScenarioMutation({
      onCompleted() {
        toast.open({
          intent: ToastIntent.SUCCESS,
          title: 'Scenario updated with success',
        });
        navigate('/scenarios');
      },
      refetchQueries: [
        'ScenariosConnection',
        'RulesConnection',
      ],
    });

  if (error) {
    return <div>Erreur</div>;
  }

  if (loading) {
    return <LoaderComponent />;
  }

  const scenario = data?.scenario as Scenario;

  return (
    <div className="relative">
      <div className="absolute right-2 top-2">
        <DeleteScenarioButtonComponent scenarioId={id} />
      </div>
      <ScenarioForm
        loading={loadingMutation}
        defaultScenario={scenario}
        onSubmit={(data) =>
          updateScenario({
            variables: {
              updateScenarioId: id,
              input: {
                name: data.name,
                isEnabled: data.isAggregate,
                ruleIds: data.ruleIds,
              },
            },
          })
        }
      />
    </div>
  );
};

export default ScenarioPage;
