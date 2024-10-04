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
  disabled?: boolean;
  error?: boolean;
  warning?: boolean;
  min?: number;
  max?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disableDecimal?: boolean;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
  disabled = false,
  error = false,
  warning = false,
  min,
  max,
  onKeyDown,
  disableDecimal = false,
  onKeyUp
}) => {
  const [ isFocused, setIsFocused ] = useState(false);

  const inputClasses = cn('input');
  const inputWrapperClasses = cn('inputWrapper');


  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disableDecimal && e.key === '.') {
      e.preventDefault();
    }

    onKeyDown && onKeyDown(e);
  };

  const inputContentClasses = cn('inputContent backgroundPrimary contentPrimary borderPrimary',
    {
      'inputBorderNegative': error,
      'inputBorderWarning': warning,
      'inputPrefix': prefixIcon || prefixLabel,
      'inputFocused': isFocused && !disabled && !error,
      'backgroundSecondary borderPrimary contentSecondary': disabled
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
          disabled={disabled}
          data-testid={dataTestId}
          ref={ref}
          onWheel={handleWheel}
          min={min}
          max={max}
          onKeyDown={handleKeyDown}
          step={1}
          onKeyUp={onKeyUp}
        />
      </div>
    </div>
  );
};

export default DataRowInput;
