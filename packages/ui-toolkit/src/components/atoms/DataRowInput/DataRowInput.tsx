import React, { useState } from 'react';
import cn from 'classnames';
import './styles/index.css';
import { ReactIconComponentType } from '@groww-tech/icon-store/types.d';

export type DataRowInputProps = {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId?: string;
  width?: string;
  prefixIcon?: ReactIconComponentType;
  prefixLabel?: string;
  ref?: React.RefObject<HTMLInputElement>;
  variant?: 'default' | 'error' | 'warning' | 'disabled';
  min?: number;
  max?: number;
}


const DataRowInput: React.FC<DataRowInputProps> = ({
  placeholder,
  value,
  onChange,
  dataTestId,
  width = '128px',
  prefixIcon,
  prefixLabel,
  ref,
  variant = 'default',
  min,
  max
}) => {
  const [ isFocused, setIsFocused ] = useState(false);

  const inputClasses = cn('input');
  const inputWrapperClasses = cn('inputWrapper');


  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const inputContentClasses = cn('inputContent backgroundPrimary contentPrimary borderPrimary',
    {
      'inputBorderNegative': variant === 'error',
      'inputBorderWarning': variant === 'warning',
      'inputPrefix': prefixIcon || prefixLabel,
      'inputFocused': isFocused && variant !== 'disabled' && variant !== 'error',
      'backgroundSecondary borderPrimary contentSecondary': variant === 'disabled'
    });

  return (
    <div className={inputWrapperClasses}
      style={{ width: width }}
    >
      <div className={`${inputContentClasses}`}>
        {
          (prefixIcon || prefixLabel) && (
            <div className='prefixContainer'>
              {prefixIcon && <div className='inputPrefixIcon'>{prefixIcon}</div>}
              {prefixLabel && <div className='inputPrefixLabel'>{prefixLabel}</div>}
            </div>
          )
        }
        <input
          className={`${inputClasses} bodyBase contentPrimary`}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={variant === 'disabled'}
          data-testid={dataTestId}
          ref={ref}
          onWheel={handleWheel}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
};

export default DataRowInput;
