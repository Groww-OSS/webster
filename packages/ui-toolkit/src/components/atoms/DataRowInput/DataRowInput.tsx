import React, { useState, forwardRef } from 'react';
import cn from 'classnames';
import type { ReactIconComponentType } from '@groww-tech/icon-store';
import { ContentMintTokens } from '../../../types/mint-token-types/content-mint-tokens';
import { BackgroundMintTokens } from '../../../types/mint-token-types/background-mint-tokens';
import { BorderMintTokens } from '../../../types/mint-token-types/border-mint-tokens';
import './styles/index.css';

export type DataRowInputProps = {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId?: string;
  width?: string;
  PrefixIcon?: ReactIconComponentType;
  prefixLabel?: string;
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
  textAlign?: 'left-align' | 'right-align' | 'center-align';
  borderColor?: BorderMintTokens;
  perfixTextColor?: ContentMintTokens;
  prefixIconColor?: ContentMintTokens;
  backgroundColor?: BackgroundMintTokens;
  disableCopyPaste?: boolean;
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const DataRowInput = forwardRef<HTMLInputElement, DataRowInputProps>(({
  placeholder,
  value,
  onChange,
  dataTestId,
  width = '128px',
  PrefixIcon,
  prefixLabel,
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
  textAlign = 'right-align',
  perfixTextColor = 'contentSecondary',
  prefixIconColor = 'contentSecondary',
  backgroundColor = 'backgroundPrimary',
  borderColor = 'borderPrimary',
  disableCopyPaste = false,
  onEnterPress,
  onFocus,
  onBlur
}, ref) => {
  const [ isFocused, setIsFocused ] = useState(false);

  const inputClasses = cn('datarow-input', textAlign);
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


  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };


  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const inputContentClasses = cn(
    `datarow-inputContent ${textColor} ${borderColor}`,
    {
      [backgroundColor]: !disabled,
      'datarow-inputBorderNegative': error,
      'datarow-inputBorderWarning': warning,
      'datarow-inputPrefix': PrefixIcon || prefixLabel,
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
          (PrefixIcon || prefixLabel) && (
            <div
              className='datarow-prefixContainer'
              data-test-id={`${dataTestId}-prefix-container`}
            >
              {
                PrefixIcon && (
                  <div
                    className={`datarow-inputPrefixIcon ${prefixIconColor}`}
                    data-test-id={`${dataTestId}-prefix-icon`}
                  >
                    {/* Hardcoding size to 20 to maintain consistency across different icons and elements */}
                    <PrefixIcon size={20}/>
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
          onFocus={handleFocus}
          onBlur={handleBlur}
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
});

export default DataRowInput;
