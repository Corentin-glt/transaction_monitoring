import {
  Description,
  Label,
  Switch,
  SwitchField,
} from '@transaction-monitoring/client-components';
import { FunctionComponent, useState } from 'react';
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';

interface SwitchFieldProps {
  label: string;
  error?: FieldError;
  name: string;
  description?: string;
  control: Control<any>;
  required?: boolean;
  defaultValue?: boolean;
}

const SwitchFieldComponent: FunctionComponent<SwitchFieldProps> =
  function ({
    name,
    label,
    description,
    error,
    control,
    required,
    defaultValue = false,
    ...rest
  }) {
    return (
      <div className="flex flex-col justify-start w-1/2 mt-4 gap-1">
        <span className="text-base/6 text-zinc-950 select-none data-disabled:opacity-50 sm:text-sm/6 dark:text-white">
          {label}
        </span>
        {description && (
          <span className="text-base/6 text-zinc-500 data-disabled:opacity-50 sm:text-sm/6 dark:text-zinc-400">
            {description}
          </span>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => (
            <button
              type="button"
              onClick={() => onChange(!value)}
              className={`relative w-10 h-6 flex items-center rounded-full p-1 transition-all border border-950/10 duration-300 shadow-inner ${
                value ? 'bg-badoit' : 'bg-zinc-950/50'
              }`}
            >
              <div
                className={`w-4 h-4 bg-zinc-400 rounded-full shadow-md transform transition-all ${
                  value ? 'translate-x-4' : 'translate-x-0'
                }`}
              ></div>
            </button>
          )}
        />
      </div>
    );
  };

export default SwitchFieldComponent;
