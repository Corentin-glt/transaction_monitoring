import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Fieldset,
  Legend,
  Text,
} from '@transaction-monitoring/client-components';
import {
  Currency,
  CurrencyValues,
} from '@transaction-monitoring/interface';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { displayCurrencyType } from '../../../utils/displayCurrency';
import ListInputField from '../inputs/listInputField.component';

const schema = yup
  .object({
    transactions: yup
      .array(
        yup.object({
          amount: yup.number().min(0).required(),
          currency: yup
            .string()
            .oneOf(Object.values(CurrencyValues)),
          externalId: yup.string().required(),
          sourceAccount: yup.string().required(),
          targetAccount: yup.string().required(),
        })
      )
      .min(1, 'Please to provide at least one transaction')
      .required(),
  })
  .required();

type ICreateTransactionsInputs = yup.InferType<
  typeof schema
>;

interface CreateTransactionsFormProps {
  onSubmit: (
    data: ICreateTransactionsInputs
  ) => Promise<any>;
}

const CreateTransactionsForm: FunctionComponent<CreateTransactionsFormProps> =
  function ({ onSubmit }) {
    const {
      control,
      handleSubmit,
      register,
      reset,
      watch,
      formState: { errors, isValid },
    } = useForm<ICreateTransactionsInputs>({
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
          <Legend>Bulk transactions</Legend>
          <Text>
            Please add as many transactions as your bank
            account allows.
          </Text>
          <ListInputField
            control={control}
            register={register}
            watch={watch}
            name="transactions"
            errors={errors}
            inputFields={[
              {
                key: 'amount',
                defaultValue: 0,
                label: 'Amount',
                required: true,
              },
              {
                key: 'externalId',
                defaultValue: '',
                placeholder: 'External ID',
                label: 'External ID',
                required: true,
              },
              {
                key: 'sourceAccount',
                defaultValue: '',
                placeholder: 'Source Account',
                label: 'Source Account',
                required: true,
              },
              {
                key: 'targetAccount',
                defaultValue: '',
                placeholder: 'Target Account',
                label: 'Target Account',
                required: true,
              },
              {
                key: 'currency',
                defaultValue: CurrencyValues.EUROS,
                placeholder: 'currency',
                label: 'Currency',
                select: {
                  options: Object.values(
                    CurrencyValues
                  ).map((type) => {
                    const { label, symbol } =
                      displayCurrencyType(type as Currency);
                    return {
                      value: type,
                      label: `${label} - ${symbol}`,
                    };
                  }),
                },
              },
            ]}
            labelAddButton="+ Add transaction"
          />
        </Fieldset>
        <Button
          className="p-2 hover:cursor-pointer disabled:cursor-default disabled:opacity-50"
          type="submit"
          disabled={!isValid}
        >
          Submit transactions
        </Button>
      </form>
    );
  };

export default CreateTransactionsForm;
