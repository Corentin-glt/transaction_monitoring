import { FunctionComponent } from 'react';

interface PresentAttributeComponentProps {
  label: string;
  value: string | number;
}

const PresentAttributeComponent: FunctionComponent<PresentAttributeComponentProps> =
  function ({ label, value }) {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {label}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {value}
          </p>
        </div>
      </div>
    );
  };

export default PresentAttributeComponent;
