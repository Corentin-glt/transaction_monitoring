import {
  Field,
  Label,
} from '@transaction-monitoring/client-components';
import { FunctionComponent, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import {
  Rule,
  SortingEnum,
  useRulesConnectionQuery,
} from '../../../utils/generated';
import LoaderComponent from '../loaders.component';
import MultipleSelectDropDownComponent from './multipleSelectDropdown.component';

interface RulesSelectFieldComponentProps {
  defaultSelectedRules?: Rule[];
  control: Control<any>;
  name: string;
}

const RulesSelectFieldComponent: FunctionComponent<RulesSelectFieldComponentProps> =
  function ({ defaultSelectedRules, name, control }) {
    const [limit] = useState(10000);
    const [offset] = useState(0);
    const {
      data,
      loading,
      error: errorQuery,
    } = useRulesConnectionQuery({
      variables: {
        offset,
        limit,
        sorting: {
          createdAt: SortingEnum.Desc,
        },
      },
    });

    if (loading) {
      return <LoaderComponent />;
    }

    if (errorQuery || !data) {
      //TODO: make an error component
      return <div>Error</div>;
    }

    const rules = data.rulesConnection.items;

    return (
      <Field>
        <Label>Rule list</Label>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultSelectedRules?.map(
            (rule) => ({
              ...rule,
              label: rule.name,
            })
          )}
          render={({
            field: { onChange },
            formState: { errors },
          }) => (
            <MultipleSelectDropDownComponent
              disabled={rules.length === 0}
              defaultSelectOptions={defaultSelectedRules?.map(
                (rule) => ({
                  ...rule,
                  label: rule.name,
                })
              )}
              noOptionMessage="Please to select at leat one rule"
              datalistId="ruleIds"
              label="Please to select at leat one rule"
              placeholder="Select rule"
              options={
                rules?.map((rule) => ({
                  ...rule,
                  label: rule.name,
                })) || []
              }
              onSelect={onChange}
              error={errors.root?.message}
            />
          )}
        />
      </Field>
    );
  };

export default RulesSelectFieldComponent;
