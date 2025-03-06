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

import InputField from '../inputs/inputField.component';

const schema = yup
  .object({
    name: yup.string().required('The name is mandatory'),
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
    const {
      handleSubmit,
      register,
      reset,
      formState: { errors, isValid },
    } = useForm<ICreateRulesInputs>({
      resolver: yupResolver(schema),
    });

    return (
      <form
        onSubmit={handleSubmit(async (data) => {
          await onSubmit(data);
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
