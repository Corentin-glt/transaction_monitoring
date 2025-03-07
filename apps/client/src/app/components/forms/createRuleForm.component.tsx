import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Fieldset,
  Legend,
  Switch,
  Text,
} from '@transaction-monitoring/client-components';
import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatQuery } from 'react-querybuilder';
import * as yup from 'yup';

import InputField from '../inputs/inputField.component';
import QueryBuilderField from '../inputs/queryBuilderField.component';
import SwitchFieldComponent from '../inputs/switchField.component';

const schema = yup
  .object({
    name: yup.string().required('The name is mandatory'),
    isAggregate: yup.boolean().required(),
    jsonLogic: yup
      .mixed()
      .required('The json logic is mandatory'),
    scenarioIds: yup.array(yup.string().required()),
  })
  .required();

type ICreateRulesInputs = yup.InferType<typeof schema>;

interface CreateRuleFormProps {
  onSubmit: (data: any) => Promise<any>;
}

const CreateRuleForm: FunctionComponent<CreateRuleFormProps> =
  function ({ onSubmit }) {
    const [checked, setChecked] = useState(true);
    const {
      handleSubmit,
      control,
      register,
      reset,
      formState: { errors, isValid },
    } = useForm<ICreateRulesInputs>({
      resolver: yupResolver(schema),
    });

    return (
      <form
        onSubmit={handleSubmit(async (data) => {
          await onSubmit({
            ...data,
            jsonLogic: formatQuery(
              data.jsonLogic as any,
              'jsonlogic'
            ),
          });
          reset();
        })}
      >
        <Fieldset className="mb-4">
          <Legend>Create a new rule</Legend>
          <Text>Please to create a new rule</Text>
          <InputField
            required
            name="name"
            label="Name"
            placeholder="Name"
            register={register}
            error={errors.name}
          />
          <QueryBuilderField
            control={control}
            label="Logic"
            name="jsonLogic"
          />
          <SwitchFieldComponent
            label="Aggregate mode"
            name="isAggregate"
            description="If you enable the aggregate mode, the rule will be applied on an aggregate of transactions. (E.g: sum of amount between given date)"
            control={control}
          />
        </Fieldset>

        <Button
          className="p-2 hover:cursor-pointer disabled:cursor-default disabled:opacity-50"
          type="submit"
          disabled={!isValid}
        >
          Submit rule
        </Button>
      </form>
    );
  };

export default CreateRuleForm;
