import React, { ReactNode, useState, useEffect } from 'react';
import cn from 'classnames';
import './styles/index.css';
import { MdsIcCancelCircle } from '@groww-tech/icon-store/mint-icons';

export type FreeFormInputProps = {
  placeholder: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  dataTestId?: string;
  width?: string;
  maxLength?: number;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  prefixLabel?: string;
  error?: { hasError: boolean; message: string };
  clearable?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  helperText?: string;
}


const FreeFormInput: React.FC<FreeFormInputProps> = ({
  placeholder,
  value,
  label,
  onChange,
  disabled,
  dataTestId,
  width,
  maxLength,
  prefixIcon,
  suffixIcon,
  prefixLabel,
  error = { hasError: false, message: '' },
  clearable = false,
  ref,
  helperText
}) => {
  const [ showClearIcon, setShowClearIcon ] = useState(false);
  const [ isFocused, setIsFocused ] = useState(false);

  useEffect(() => {
    setShowClearIcon(!!clearable && value.length > 0);
  }, [ clearable, value ]);

  const inputClasses = cn(
    'input',
    {
      'inputBorderNegative': error.hasError,
      'inputClearable': clearable,
      'inputPrefix': prefixIcon || prefixLabel,
      'inputSuffix': suffixIcon || (clearable && showClearIcon),
      'inputFocused': isFocused && !disabled && !error.hasError,
      'backgroundSecondary borderPrimary contentSecondary': disabled
    }
  );

  const inputWrapperClasses = cn('inputWrapper');


  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(event);
    }
  };

  return (
    <div className={inputWrapperClasses}
      style={{ width: width }}
    >
      {label && <div className='inputLabel  bodySmallHeavy'>{label}</div>}
      <div className='inputContent backgroundPrimary contentPrimary'>
        <div className='prefixContainer'>
          {prefixIcon && <div className='inputPrefixIcon'>{prefixIcon}</div>}
          {prefixLabel && <div className='inputPrefixLabel'>{prefixLabel}</div>}
        </div>
        <input
          className={`${inputClasses} bodyBase contentPrimary`}
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          data-testid={dataTestId}
          maxLength={maxLength}
          ref={ref}
        />
        <div className='suffixContainer'>
          {
            clearable && showClearIcon && (
              <div className='inputClearIcon'
                onClick={handleClear}
              >
                <MdsIcCancelCircle />
              </div>
            )
          }
          {suffixIcon && <div className='inputSuffixIcon'>{suffixIcon}</div>}
        </div>
      </div>
      {helperText && <div className='inputHelperText contentSecondary bodySmall'>{helperText}</div>}
      {error.hasError && <div className='contentNegative'>{error.message}</div>}
    </div>
  );
};

export default FreeFormInput;
