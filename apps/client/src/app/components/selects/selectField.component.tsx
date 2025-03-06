import {
  ErrorMessage,
  Field,
  Label,
  Select,
} from '@transaction-monitoring/client-components';
import {
  FunctionComponent,
  SelectHTMLAttributes,
} from 'react';
import {
  FieldError,
  UseFormRegister,
} from 'react-hook-form';

export interface Option {
  [key: string]: any;
  label: string;
  disabled?: boolean;
}

interface SelectFieldComponentProps
  extends SelectHTMLAttributes<any> {
  options: Option[];
  name: string;
  label?: string;
  error?: FieldError;
  register: UseFormRegister<any>;
}

const SelectFieldComponent: FunctionComponent<SelectFieldComponentProps> =
  function ({
    options,
    name,
    label,
    error,
    register,
    required,
    ...rest
  }) {
    return (
      <Field>
        {label && <Label>{label}</Label>}
        <Select
          {...rest}
          {...register(name, { required })}
        >
          {options.map((o) => (
            <option
              disabled={o.disabled}
              className={`px-4  py-2 h-9 ${
                !o.disabled && 'cursor-pointer'
              } `}
              key={o.label}
              value={o.value}
            >
              {o.label}
            </option>
          ))}
        </Select>
        {error && (
          <ErrorMessage>{error.message}</ErrorMessage>
        )}
      </Field>
    );
  };

export default SelectFieldComponent;
