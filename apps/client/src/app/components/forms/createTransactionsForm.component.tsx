import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Fieldset,
  Legend,
  Text,
} from '@transaction-monitoring/client-components';
import { CurrencyValues } from '@transaction-monitoring/interface';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useCreateTransactionsMutation } from '../../../utils/generated';
import { ToastIntent } from '../../../utils/providers/toasts/toastProvider';
import { useToast } from '../../../utils/providers/toasts/toastService';
import ListInputField from '../inputs/listInputField.component';

interface CreateTransactionsFormProps {
  onSubmit?: () => void;
}

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
      .required(),
  })
  .required();

type ICreateTransactionsInputs = yup.InferType<
  typeof schema
>;

const CreateTransactionsForm: FunctionComponent<CreateTransactionsFormProps> =
  function ({ onSubmit }) {
    const toast = useToast();
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

    const [createWorksite, { loading }] =
      useCreateTransactionsMutation({
        onCompleted() {
          toast.open({
            intent: ToastIntent.SUCCESS,
            title: 'Transactions Bulk done with success',
          });
          onSubmit && onSubmit();
          reset();
        },
      });

    return (
      <form
        className=""
        onSubmit={handleSubmit((data) => {
          createWorksite({
            variables: {
              input: {
                ...data,
              },
            },
          });
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
            name="groups"
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
                placeholder: 'Source Account',
                label: 'Source Account',
                required: true,
              },
              // {
              //   key: 'targetAccount',
              //   defaultValue: '',
              //   placeholder: 'Source Account',
              //   label: 'Source Account',
              //   required: true,
              // },
            ]}
            labelAddButton="+ Add transaction"
          />
        </Fieldset>
        <Button
          className="p-2"
          type="submit"
          disabled={!isValid}
        >
          Submit transactions
        </Button>
      </form>
    );
  };

export default CreateTransactionsForm;
