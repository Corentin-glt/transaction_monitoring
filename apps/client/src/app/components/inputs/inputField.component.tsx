import {
  ErrorMessage,
  Field,
  Input,
  Label,
} from '@transaction-monitoring/client-components';
import {
  FunctionComponent,
  InputHTMLAttributes,
} from 'react';
import {
  FieldError,
  UseFormRegister,
} from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<any> {
  label?: string;
  error?: FieldError;
  name: string;
  register: UseFormRegister<any>;
}

const InputField: FunctionComponent<InputFieldProps> =
  function ({
    name,
    className,
    label,
    error,
    disabled,
    required,
    onChange,
    register,
    ...rest
  }) {
    return (
      <Field>
        <Label>{label}</Label>
        <Input
          invalid={!!error}
          {...register(name, { required, onChange })}
          {...rest}
        />
        {error && (
          <ErrorMessage>{error.message}</ErrorMessage>
        )}
      </Field>
    );
  };

export default InputField;
