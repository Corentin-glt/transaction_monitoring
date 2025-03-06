import { TrashIcon } from '@heroicons/react/24/solid';
import {
  Button,
  FieldGroup,
} from '@transaction-monitoring/client-components';
import { FunctionComponent } from 'react';
import {
  Control,
  FieldError,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

import InputField, {
  InputFieldProps,
} from './inputField.component';
import SelectFieldComponent, {
  Option,
} from '../selects/selectField.component';

interface InputField
  extends Omit<InputFieldProps, 'name' | 'register'> {
  key: string;
  defaultValue: string | number;
  select?: {
    options: Option[];
  };
}

interface ListInputFieldProps {
  control: Control<any>;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  inputFields: InputField[];
  name: string;
  labelAddButton?: string;
  errors?: FieldErrors<any>;
}

const ListInputField: FunctionComponent<ListInputFieldProps> =
  function ({
    control,
    errors,
    name,
    register,
    inputFields,
    watch,
    labelAddButton,
  }) {
    const { fields, append, remove } = useFieldArray({
      control,
      name,
    });

    const watchFieldArray = watch(name);
    const controlledFields = fields.map((field, index) => {
      return {
        ...field,
        ...watchFieldArray[index],
      };
    });

    return (
      <div className="flex flex-col gap-4">
        {controlledFields.map((field, index) => (
          <div
            className="flex gap-x-6"
            key={field.id}
          >
            {inputFields.map((input) => {
              if (input.select) {
                return (
                  <SelectFieldComponent
                    {...input}
                    name={`${name}.${index}.${input.key}`}
                    options={input.select.options}
                    register={register}
                    error={
                      errors &&
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-ignore
                      (errors?.[name]?.[index]?.[
                        input.key
                      ] as FieldError)
                    }
                  />
                );
              }
              return (
                <InputField
                  {...input}
                  key={`${field.id}-${input.key}`}
                  name={`${name}.${index}.${input.key}`}
                  error={
                    errors &&
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    (errors?.[name]?.[index]?.[
                      input.key
                    ] as FieldError)
                  }
                  register={register}
                />
              );
            })}
            {!field.removeDeleteButton && (
              <div className="pt-9">
                <Button
                  onClick={() => remove(index)}
                  className="hover:cursor-pointer"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
        <div>
          <Button
            className="p-2 hover:cursor-pointer"
            onClick={() => {
              const newField: {
                [x: string]: string | number;
              } = {};
              for (const inputField of inputFields) {
                newField[inputField.key] =
                  inputField.defaultValue;
              }
              append(newField);
            }}
          >
            {labelAddButton || '+'}
          </Button>
        </div>
      </div>
    );
  };

export default ListInputField;
