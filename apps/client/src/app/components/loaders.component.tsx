import { FunctionComponent } from 'react';

interface LoaderComponentProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const LoaderComponent: FunctionComponent<LoaderComponentProps> =
  function ({ size = 'md' }) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-y-8">
        <span
          className={`loading loading-dots loading-${size}`}
        ></span>
      </div>
    );
  };

export default LoaderComponent;
