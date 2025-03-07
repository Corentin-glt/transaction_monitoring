import {
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid';
import { Badge } from '@transaction-monitoring/client-components';
import {
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { FieldError, Merge } from 'react-hook-form';

import useComponentVisible from '../../../utils/hooks/useComponentVisible';
import LoaderComponent from '../loaders.component';

interface Option {
  [key: string]: any;
  label: string;
}

interface SelectDropDownProps {
  defaultSelectOptions?: Option[];
  label: string;
  placeholder: string;
  datalistId: string;
  noOptionMessage: string;
  loading?: boolean;
  disabled?: boolean;
  options: Option[];
  error?: string;
  onSelect: (data: any) => void;
}

const MultipleSelectDropDownComponent: FunctionComponent<SelectDropDownProps> =
  function ({
    defaultSelectOptions,
    label,
    placeholder,
    datalistId,
    noOptionMessage,
    options,
    loading,
    disabled,
    error,
    onSelect,
  }) {
    const [selectedOptions, setSelectedOptions] = useState<
      Option[]
    >(defaultSelectOptions || []);
    const { ref, isComponentVisible } =
      useComponentVisible(false);

    useEffect(() => {
      if (
        selectedOptions.length <= 0 ||
        !options.some((o) => o.id === selectedOptions[0].id)
      ) {
        setSelectedOptions([]);
      }
    }, [options]);

    const addSelectedOption = (option: Option) => {
      if (selectedOptions.length > 0) {
        setSelectedOptions([...selectedOptions, option]);
        return onSelect([...selectedOptions, option]);
      }

      setSelectedOptions([option]);
      return onSelect([option]);
    };

    const removeSelectedOption = (option: Option) => {
      if (selectedOptions.length === 1) {
        setSelectedOptions([]);
        return onSelect([]);
      }

      const newSelectedOptions = selectedOptions.filter(
        (so) => so.id !== option.id
      );
      setSelectedOptions(newSelectedOptions);
      return onSelect(newSelectedOptions);
    };

    return (
      <div
        className={`space-y-2 ${
          disabled && `hover:cursor-not-allowed opacity-70`
        }`}
      >
        <span className="block text-sm font-medium text-slate-700 dark:text-zinc-200">
          {label}
        </span>
        <div
          className=" flex flex-col relative"
          ref={!disabled ? ref : undefined}
        >
          <div
            className={`flex items-center justify-between rounded-8 px-4 text-sm gap-x-2  border shadow-sm p-2 ${
              disabled
                ? 'hover:cursor-not-allowed opacity-70'
                : 'hover:cursor-pointer'
            }`}
          >
            {selectedOptions.length > 0 ? (
              <div className="flex gap-x-2">
                {selectedOptions?.map((o) => (
                  <Badge color="lime">{o.label}</Badge>
                ))}
              </div>
            ) : (
              <span className="block text-sm font-medium text-slate-700 dark:text-zinc-200">
                {placeholder}
              </span>
            )}
            <div>
              {isComponentVisible ? (
                <ChevronUpIcon className="text-bold h-4 w-4 " />
              ) : (
                <ChevronDownIcon className="text-bold h-4 w-4 " />
              )}
            </div>
          </div>

          {isComponentVisible && (
            <datalist
              aria-disabled={disabled}
              className="z-10 absolute bg-white  shadow-sm mt-2 text-sm font-medium  text-slate-700  top-10 w-full flex flex-col items-left overflow-hidden rounded-8  border"
              id={datalistId}
            >
              {loading && (
                <div className="px-4 py-2">
                  <LoaderComponent />
                </div>
              )}
              {!loading && (
                <option
                  className="px-4 py-2"
                  disabled
                >
                  {options.length === 0
                    ? noOptionMessage
                    : label}
                </option>
              )}

              {options.map((o) => {
                const isSelected = selectedOptions?.some(
                  (so) => so.id === o.id
                );
                return (
                  <option
                    disabled={o.disabled}
                    className={`
                    px-4  py-2
                    ${
                      !o.disabled &&
                      'hover:bg-slate-100 cursor-pointer'
                    }
                    ${
                      isSelected &&
                      'bg-slate-100 text-zinc-950'
                    }
                  `}
                    key={o.label}
                    value={o.label}
                    onClick={() => {
                      if (isSelected) {
                        removeSelectedOption(o);
                      } else {
                        addSelectedOption(o);
                      }
                    }}
                  >
                    {o.label}
                  </option>
                );
              })}
            </datalist>
          )}
        </div>
        {error && (
          <p className="text-sm ont-light text-pink-600 leading-6">
            {error.message}
          </p>
        )}
      </div>
    );
  };

export default MultipleSelectDropDownComponent;
