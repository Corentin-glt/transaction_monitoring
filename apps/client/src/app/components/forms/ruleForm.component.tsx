import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Fieldset,
  Legend,
  Text,
} from '@transaction-monitoring/client-components';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { formatQuery } from 'react-querybuilder';
import { parseJsonLogic } from 'react-querybuilder/parseJsonLogic';
import * as yup from 'yup';

import { Rule } from '../../../utils/generated';
import InputField from '../inputs/inputField.component';
import QueryBuilderField from '../inputs/queryBuilderField.component';
import SwitchFieldComponent from '../inputs/switchField.component';

const schema = yup
  .object({
    name: yup.string().required('The name is mandatory'),
    isAggregate: yup.boolean().required(),
    jsonLogic: yup
      .object()
      .shape({
        combinator: yup
          .string()
          .required('Combinator is required'),
        rules: yup
          .array()
          .min(1, 'At least one rule is required'),
      })
      .required(),
    scenarioIds: yup.array(yup.string().required()),
  })
  .required();

type IRuleFormsInputs = yup.InferType<typeof schema>;

interface RuleFormFormProps {
  onSubmit: (data: any) => Promise<any>;
  defaultRule?: Rule;
  loading?: boolean;
}

const RuleForm: FunctionComponent<RuleFormFormProps> =
  function ({ onSubmit, defaultRule, loading }) {
    const {
      handleSubmit,
      control,
      register,
      reset,
      getValues,
      formState: { errors, isValid },
    } = useForm<IRuleFormsInputs>({
      resolver: yupResolver(schema),
      defaultValues: {
        name: defaultRule?.name,
        isAggregate: defaultRule?.isAggregate,
        jsonLogic: defaultRule?.jsonLogic
          ? parseJsonLogic(defaultRule.jsonLogic)
          : undefined,
        scenarioIds: defaultRule?.scenarios?.map(
          (s) => s.id
        ),
      },
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
            defaultValue={getValues('jsonLogic')}
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
          disabled={!isValid || loading}
        >
          {!loading ? 'Submit rule' : 'Loading'}
        </Button>
      </form>
    );
  };

export default RuleForm;
