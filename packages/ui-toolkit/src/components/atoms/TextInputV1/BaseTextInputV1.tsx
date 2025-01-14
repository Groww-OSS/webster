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
    disabled,
    ...rest
  } = props;

  const containerClassName = `text-input-container ${variant} ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`;
  const wrapperClassName = `text-input-wrapper ${variant}`;
  const inputClassName = `text-input ${variant} ${calculateInputClass(size)} ${disabled ? 'disabled' : ''}`;
  const errorClassName = `text-input-error ${error ? 'visible' : 'hidden'}`;

  return (
    <>
      {label && <div className="text-input-label bodyBase">{label}</div>}
      <div className={containerClassName}>
        <div className={wrapperClassName}>
          {
            PrefixComponent && (
              <span className={`text-input-trailing ${variant}`}>{PrefixComponent()}</span>
            )
          }
          <input
            ref={ref}
            data-test-id={inputDataTestId || null}
            className={inputClassName}
            onCopy={onCopy}
            onPaste={onPaste}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            {...rest}
          />
          {
            SuffixComponent && (
              <span className={`text-input-leading ${variant}`}>{SuffixComponent()}</span>
            )
          }
        </div>
      </div>
      {
        (variant !== 'unstyled' || error) && (
          <div
            className={errorClassName}
            data-test-id={errorDataTestId || null}
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
