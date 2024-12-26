import React, { useState } from 'react';
import cn from 'classnames';
import './styles/index.css';
import { ReactIconComponentType } from '@groww-tech/icon-store/types.d';
import { ContentMintTokens } from '../../../types/mint-token-types/content-mint-tokens';
import { BackgroundMintTokens } from '../../../types/mint-token-types/background-mint-tokens';

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
  textStyle?: 'bodyLarge' | 'bodyLargeHeavy';
  textColor?: ContentMintTokens;
  perfixTextColor?: ContentMintTokens;
  backgroundColor?: BackgroundMintTokens;
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
  onKeyUp,
  textStyle = 'bodyLarge',
  textColor = 'contentPrimary',
  perfixTextColor = 'contentSecondary',
  backgroundColor = 'backgroundPrimary'
}) => {
  const [ isFocused, setIsFocused ] = useState(false);

  const inputClasses = cn('datarow-input');
  const inputWrapperClasses = cn('datarow-inputWrapper');


  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disableDecimal && e.key === '.') {
      e.preventDefault();
    }

    onKeyDown && onKeyDown(e);
  };

  const inputContentClasses = cn(
    `datarow-inputContent ${textStyle} ${textColor} borderPrimary`,
    {
      [backgroundColor]: !disabled,
      'datarow-inputBorderNegative': error,
      'datarow-inputBorderWarning': warning,
      'datarow-inputPrefix': prefixIcon || prefixLabel,
      'datarow-inputFocused': isFocused && !disabled && !error,
      'backgroundSecondary contentSecondary': disabled
    }
  );

  return (
    <div className={inputWrapperClasses}
      style={{ width: width }}
    >
      <div className={`${inputContentClasses}`}>
        {
          (prefixIcon || prefixLabel) && (
            <div className='datarow-prefixContainer'>
              {prefixIcon && <div className='datarow-inputPrefixIcon'>{prefixIcon}</div>}
              {prefixLabel && <div className={`datarow-inputPrefixLabel ${perfixTextColor}`}>{prefixLabel}</div>}
            </div>
          )
        }
        <input
          className={`${inputClasses} ${textColor} datarow-contentPrimary`}
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