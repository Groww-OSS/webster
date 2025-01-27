import React from 'react';
import './styles.css';

import { TextInputProps } from './TextInputV1';

const BaseTextInputV1 = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    onKeyDown = () => { },
    onKeyUp = () => { },
    onCopy = () => { },
    onPaste = () => { },
    error,
    variant = 'default',
    size = 'medium',
    label,
    inputDataTestId = '',
    errorDataTestId = '',
    PrefixComponent,
    SuffixComponent,
    ...rest
  } = props;

  return (
    <>
      {label && <div className="text-input-v1-label bodyBase">{label}</div>}
      <div className={`text-input-v1-container ${variant} ${error ? 'error' : ''}`}>
        <div className={`text-input-v1-wrapper ${variant}`}>
          {PrefixComponent && <span className={`text-input-v1-trailing-vis ${variant}`}>{PrefixComponent()}</span>}
          <input
            ref={ref}
            data-test-id={inputDataTestId.length ? inputDataTestId : null}
            className={`text-input-v1-primary-input ${calculateInputClass(size)} ${variant}`}
            onCopy={onCopy}
            onPaste={onPaste}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            {...rest}
          />
          {SuffixComponent && <span className={`text-input-v1-leading-vis ${variant}`}>{SuffixComponent()}</span>}
        </div>
      </div>
      {
        error && variant === 'unstyled' && (
          <div className="text-input-v1-error-label bodyBase"
            data-test-id={errorDataTestId.length ? errorDataTestId : null}
          >
            {error}
          </div>
        )
      }
      {
        variant !== 'unstyled' && (
          <div className="text-input-v1-error-label bodyBase"
            data-test-id={errorDataTestId.length ? errorDataTestId : null}
          >
            {error}
          </div>
        )
      }
    </>
  );
});


const calculateInputClass = (size: TextInputProps['size']): string => {
  switch (size) {
    case 'small':
      return 'bodyBase';

    case 'medium':
      return 'bodyLarge';

    case 'large':
      return 'headingLarge';

    default:
      return 'bodyLarge';
  }
};

export default BaseTextInputV1;
