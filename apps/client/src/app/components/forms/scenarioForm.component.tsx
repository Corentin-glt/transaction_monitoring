import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Fieldset,
  Legend,
  Text,
} from '@transaction-monitoring/client-components';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Rule, Scenario } from '../../../utils/generated';
import InputField from '../inputs/inputField.component';
import SwitchFieldComponent from '../inputs/switchField.component';
import RulesSelectFieldComponent from '../selects/rulesSelectField.component';

const schema = yup
  .object({
    name: yup.string().required('The name is mandatory'),
    isEnabled: yup.boolean().required(),
    rules: yup
      .array(yup.object({ id: yup.string() }).required())
      .min(1, 'You should attach at least one rule')
      .required(),
  })
  .required();

type IScenarioFormsInputs = yup.InferType<typeof schema>;

interface ScenarioFormFormProps {
  onSubmit: (data: any) => Promise<any>;
  defaultScenario?: Scenario;
  loading?: boolean;
}

const ScenarioForm: FunctionComponent<ScenarioFormFormProps> =
  function ({ onSubmit, defaultScenario, loading }) {
    const {
      handleSubmit,
      control,
      register,
      reset,
      getValues,
      formState: { errors, isValid },
    } = useForm<IScenarioFormsInputs>({
      resolver: yupResolver(schema),
      defaultValues: {
        name: defaultScenario?.name,
        isEnabled: defaultScenario?.isEnabled
          ? !!defaultScenario.isEnabled
          : true,
        rules: defaultScenario?.rules || [],
      },
    });

    return (
      <form
        onSubmit={handleSubmit(async (data) => {
          await onSubmit({
            name: data.name,
            isEnabled: data.isEnabled,
            ruleIds: data.rules.map((r) => r.id),
          });
          reset();
        })}
      >
        <Fieldset className="mb-4">
          <Legend>Create a new scenario</Legend>
          <Text>Please to create a new scenario</Text>
          <InputField
            required
            name="name"
            label="Name"
            placeholder="Name"
            register={register}
            error={errors.name}
          />

          <RulesSelectFieldComponent
            defaultSelectedRules={
              getValues('rules') as Rule[]
            }
            control={control}
            name="rules"
          />

          <SwitchFieldComponent
            label="Enabled"
            name="isEnabled"
            description="If you disabled the scenario, the attached rules to it won't take effect for the next transactions."
            control={control}
          />
        </Fieldset>

        <Button
          className="p-2 hover:cursor-pointer disabled:cursor-default disabled:opacity-50"
          type="submit"
          disabled={!isValid || loading}
        >
          {!loading ? 'Submit scenario' : 'Loading'}
        </Button>
      </form>
    );
  };

export default ScenarioForm;
