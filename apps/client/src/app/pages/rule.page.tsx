import { FunctionComponent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Rule,
  useRuleQuery,
  useUpdateRuleMutation,
} from '../../utils/generated';
import { ToastIntent } from '../../utils/providers/toasts/toastProvider';
import { useToast } from '../../utils/providers/toasts/toastService';
import DeleteButtonComponent from '../components/buttons/deleteRuleButton.component';
import RuleForm from '../components/forms/ruleForm.component';

const RulePage: FunctionComponent = function ({}) {
  const { id } = useParams() as { id: string };
  const toast = useToast();
  const navigate = useNavigate();
  const { data, loading, error } = useRuleQuery({
    variables: { ruleId: id },
  });
  const [updateRule, { loading: loadingMutation }] =
    useUpdateRuleMutation({
      onCompleted() {
        toast.open({
          intent: ToastIntent.SUCCESS,
          title: 'Rule updated with success',
        });
        navigate('/rules');
      },
      refetchQueries: ['RulesConnection'],
    });

  if (error) {
    return <div>Erreur</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  const rule = data?.rule as Rule;

  return (
    <div className="relative">
      <div className="absolute right-2 top-2">
        <DeleteButtonComponent ruleId={id} />
      </div>
      <RuleForm
        loading={loadingMutation}
        defaultRule={rule}
        onSubmit={(data) =>
          updateRule({
            variables: {
              updateRuleId: id,
              input: {
                name: data.name,
                isAggregate: data.isAggregate,
                jsonLogic: data.jsonLogic,
                scenarioIds: data.scenarioIds,
              },
            },
          })
        }
      />
    </div>
  );
};

export default RulePage;
