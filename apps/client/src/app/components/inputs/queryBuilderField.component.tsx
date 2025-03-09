import {
  Field,
  Label,
} from '@transaction-monitoring/client-components';
import { format, parse } from 'date-fns';
import { FunctionComponent } from 'react';
import DatePicker from 'react-datepicker';
import { Control, Controller } from 'react-hook-form';
import QueryBuilder, {
  ValueEditor,
  ValueEditorProps,
} from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import 'react-datepicker/dist/react-datepicker.css';

const fields = [
  { name: 'amount', label: 'Amount', datatype: 'number' },
  { name: 'createdAt', label: 'Date', datatype: 'date' },
];

const operators = [
  { name: '==', label: '=' },
  { name: '!=', label: '!=' },
  { name: '<', label: '<' },
  { name: '<=', label: '<=' },
  { name: '>', label: '>' },
  { name: '>=', label: '>=' },
];

const dateFormat = 'yyyy-MM-dd';

const CustomValueEditor: FunctionComponent<ValueEditorProps> =
  function (props) {
    if (props.fieldData.datatype === 'date') {
      return (
        <DatePicker
          dateFormat={dateFormat}
          selected={
            props.value
              ? parse(props.value, dateFormat, new Date())
              : null
          }
          onChange={(date: Date | null) =>
            props.handleOnChange(
              date ? format(date, dateFormat) : ''
            )
          }
        />
      );
    }
    return <ValueEditor {...props} />;
  };

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
              operators={operators}
              query={value}
              onQueryChange={onChange}
              controlElements={{
                valueEditor: CustomValueEditor,
              }}
            />
          )}
        />
      </Field>
    );
  };

export default QueryBuilderField;
