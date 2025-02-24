import React, { useState } from 'react';
import cn from 'classnames';
import './styles/index.css';
import type { ReactIconComponentType } from '@groww-tech/icon-store';
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
  disableCopyPaste?: boolean;
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
  backgroundColor = 'backgroundPrimary',
  disableCopyPaste = false,
  onEnterPress
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

    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress(e);
    }

    onKeyDown && onKeyDown(e);
  };


  const handleCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disableCopyPaste) {
      e.preventDefault();
    }
  };

  const inputContentClasses = cn(
    `datarow-inputContent ${textColor} borderPrimary`,
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
    <div
      className={inputWrapperClasses}
      style={{ width: width }}
      data-test-id={`${dataTestId}-container`}
    >
      <div
        className={`${inputContentClasses}`}
        data-test-id={`${dataTestId}-content`}
      >
        {
          (prefixIcon || prefixLabel) && (
            <div
              className='datarow-prefixContainer'
              data-test-id={`${dataTestId}-prefix-container`}
            >
              {
                prefixIcon && (
                  <div
                    className='datarow-inputPrefixIcon'
                    data-test-id={`${dataTestId}-prefix-icon`}
                  >
                    {prefixIcon}
                  </div>
                )
              }
              {
                prefixLabel && (
                  <div
                    className={`datarow-inputPrefixLabel ${perfixTextColor}`}
                    data-test-id={`${dataTestId}-prefix-label`}
                  >
                    {prefixLabel}
                  </div>
                )
              }
            </div>
          )
        }
        <input
          className={`${inputClasses} ${textStyle} ${textColor} datarow-contentPrimary`}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          data-test-id={dataTestId}
          ref={ref}
          onWheel={handleWheel}
          min={min}
          max={max}
          onKeyDown={handleKeyDown}
          step={1}
          onKeyUp={onKeyUp}
          onCopy={handleCopyPaste}
          onCut={handleCopyPaste}
          onPaste={handleCopyPaste}
        />
      </div>
    </div>
  );
};

export default DataRowInput;
