import {
  Field,
  Label,
} from '@transaction-monitoring/client-components';
import { FunctionComponent } from 'react';
import { Control, Controller } from 'react-hook-form';
import QueryBuilder, {
  formatQuery,
} from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';

const fields = [
  { name: 'amount', label: 'Amount', type: 'number' },
  { name: 'createdAt', label: 'Date', type: 'date' },
  { name: 'currency', label: 'Currency', type: 'string' },
];

interface QueryBuilderFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  defaultValue?: any;
}

const QueryBuilderField: FunctionComponent<QueryBuilderFieldProps> =
  function ({ control, name, label, defaultValue }) {
    return (
      <Field>
        <Label>{label}</Label>
        <Controller
          name={name}
          control={control}
          defaultValue={{ combinator: 'and', rules: [] }}
          render={({ field: { value, onChange } }) => (
            <QueryBuilder
              fields={fields}
              query={value}
              onQueryChange={onChange}
            />
          )}
        />
      </Field>
    );
  };

export default QueryBuilderField;
