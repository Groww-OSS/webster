import React, { ReactNode, useState, useEffect } from 'react';
import cn from 'classnames';
import './styles/index.css';
import {
  MdsIcCancelCircle,
  MdsIcError,
  MdsIcShowEye,
  MdsIcHideEye
} from '@groww-tech/icon-store/mint-icons';
import { ReactIconComponentType } from '@groww-tech/icon-store/types.d';

export type FreeFormInputProps = {
  placeholder?: string;
  value: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  dataTestId?: string;
  width?: string;
  maxLength?: number;
  prefixIcon?: ReactIconComponentType;
  suffixIcon?: ReactIconComponentType;
  prefixLabel?: string;
  error?: { hasError: boolean; message: string };
  clearable?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  helperText?: string;
  variant?: 'text' | 'password' | 'number';
}


const FreeFormInput: React.FC<FreeFormInputProps> = ({
  placeholder,
  value,
  label,
  onChange,
  disabled,
  dataTestId,
  width = '128px',
  maxLength,
  prefixIcon,
  suffixIcon,
  prefixLabel,
  error = { hasError: false, message: '' },
  clearable = false,
  ref,
  helperText,
  variant = 'text'

}) => {
  const [ showClearIcon, setShowClearIcon ] = useState(false);
  const [ isFocused, setIsFocused ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);

  useEffect(() => {
    setShowClearIcon(!!clearable && value.length > 0);
  }, [ clearable, value ]);

  const inputClasses = cn('input');

  const inputWrapperClasses = cn('inputWrapper');


  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (variant === 'number') {
      e.currentTarget.blur();
    }
  };

  const inputContentClasses = cn('inputContent backgroundPrimary contentPrimary borderPrimary',
    {
      'inputBorderNegative': error.hasError,
      'inputClearable': clearable,
      'inputPrefix': prefixIcon || prefixLabel,
      'inputSuffix': suffixIcon || (clearable && showClearIcon) || variant === 'password',
      'inputFocused': isFocused && !disabled && !error.hasError,
      'backgroundSecondary borderPrimary contentSecondary': disabled
    });


  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(event);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className={inputWrapperClasses}
      style={{ width: width }}
    >
      {label && <div className='bodySmallHeavy contentSecondary'>{label}</div>}
      <div className={`${inputContentClasses}`}>
        {
          (prefixIcon || prefixLabel) && <div className='prefixContainer'>
            {prefixIcon && <div className='inputPrefixIcon'>{prefixIcon}</div>}
            {prefixLabel && <div className='inputPrefixLabel'>{prefixLabel}</div>}
          </div>
        }
        <input
          className={`${inputClasses} bodyBase contentPrimary`}
          type={
            variant === 'password' ? (showPassword ? 'text' : 'password')
            : variant === 'number' ? 'number' : 'text'
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          data-testid={dataTestId}
          maxLength={maxLength}
          ref={ref}
          onWheel={handleWheel}
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
          {
            variant === 'password' && (
              <div className='inputSuffixIcon'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <MdsIcHideEye /> : <MdsIcShowEye />}
              </div>
            )
          }
          {suffixIcon && <div className='inputSuffixIcon'>{suffixIcon}</div>}
        </div>
      </div>
      {helperText && <div className='contentSecondary bodySmall'>{helperText}</div>}
      {error.hasError && error.message && <div className='contentNegative inputErrorText bodySmall'><MdsIcError/>{error.message}</div>}
    </div>
  );
};

export default FreeFormInput;
