import React, { ReactNode } from 'react';
import cn from 'classnames';
import { ChevronRight } from '@groww-tech/icon-store/mi';


export interface FreeFormInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  dataTestId?: string;
  width?: string;
  maxLength?: number;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  prefixLabel?: string;
  suffixLabel?: string;
  error:{hasError : boolean; message: string};
  warning:{hasWarning : boolean; message: string};
  clearable?: boolean;
  ref : React.RefObject<HTMLInputElement>;
  helperText?: string;
}


const FreeFormInput: React.FC<FreeFormInputProps> = ({
  placeholder,
  value,
  onChange,
  disabled,
  dataTestId,
  width,
  maxLength,
  prefixIcon,
  suffixIcon,
  prefixLabel,
  suffixLabel,
  error,
  warning,
  clearable,
  ref,
  helperText
}) => {
  const inputClasses = cn(
    'input',
    {
      'inputError': error.hasError,
      'inputWarning': warning.hasWarning,
      'inputDisabled': disabled,
      'inputClearable': clearable,
      'inputPrefix': prefixIcon || prefixLabel,
      'inputSuffix': suffixIcon || suffixLabel
    }
  );

  const inputWrapperClasses = cn(
    'inputWrapper',
    {
      'inputWrapperError': error.hasError,
      'inputWrapperWarning': warning.hasWarning
    }
  );

  console.log('prefixIcon', prefixIcon);

  return (
    <div className={inputWrapperClasses}
      style={{ width }}
    >
      {prefixIcon && <div className='inputPrefixIcon'>{prefixIcon}</div>}
      {prefixLabel && <div className='inputPrefixLabel'>{prefixLabel}</div>}
      <input
        className={inputClasses}
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        data-testid={dataTestId}
        maxLength={maxLength}
        ref={ref}
      />
      {suffixIcon && <div className='inputSuffixIcon'>{suffixIcon}</div>}
      {suffixLabel && <div className='inputSuffixLabel'>{suffixLabel}</div>}
      {clearable && <div className='inputClearIcon' />}
      {error.hasError && <div className='inputErrorText'>{error.message}</div>}
      {warning.hasWarning && <div className='inputWarningText'>{warning.message}</div>}
      {helperText && <div className='inputHelperText'>{helperText}</div>}
    </div>
  );


};

export default FreeFormInput;
