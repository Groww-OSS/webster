import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import type { ReactIconComponentType } from '@groww-tech/icon-store';
import { MdsIcRemoveMinus, MdsIcAddPlus } from '@groww-tech/icon-store/mint-icons';
import TempIconButtonV2 from '../TempIconButtonV2/TempIconButtonV2';
import { ContentMintTokens } from '../../../types/mint-token-types/content-mint-tokens';
import { BackgroundMintTokens } from '../../../types/mint-token-types/background-mint-tokens';
import './styles/index.css';


export type InputStepperProps = {
  placeholder?: string;
  value: number;
  onChange: (value: number) => void;
  dataTestId?: string;
  width?: string;
  prefixIcon?: ReactIconComponentType;
  prefixLabel?: string;
  ref?: React.RefObject<HTMLInputElement>;
  error?: boolean;
  warning?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  typeable?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  textStyle?: 'bodyLarge' | 'bodyLargeHeavy';
  backgroundColor?: BackgroundMintTokens;
  textColor?: ContentMintTokens;
  shouldFocusOnMount?: boolean;
  disableCopyPaste?: boolean;
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disableDecimal?: boolean;
}


const InputStepper: React.FC<InputStepperProps> = ({
  placeholder,
  value,
  onChange,
  dataTestId,
  width = '128px',
  prefixIcon,
  prefixLabel,
  ref,
  error = false,
  warning = false,
  disabled = false,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  typeable = true,
  onKeyDown,
  onKeyUp,
  textStyle = 'bodyLarge',
  backgroundColor = 'backgroundTransparent',
  textColor = 'contentPrimary',
  shouldFocusOnMount = false,
  disableCopyPaste = false,
  onEnterPress,
  disableDecimal = false
}) => {
  const [ isFocused, setIsFocused ] = useState(false);
  const [ inputValue, setInputValue ] = useState(value.toString());

  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = ref || internalRef;

  useEffect(() => {
    setInputValue(value.toString());
  }, [ value ]);

  useEffect(() => {
    if (shouldFocusOnMount && inputRef.current) {
      inputRef.current.focus();
    }
  }, [ inputRef, shouldFocusOnMount ]);

  const inputClasses = cn('inputStepper-input width100 center-align', {
    contentDisabled: disabled
  });

  const inputWrapperClasses = cn('inputStepper-inputWrapper');

  const inputContentClasses = cn(
    `inputStepper-inputContent pos-rel flex ${textStyle} ${textColor} borderPrimary`,
    {
      [backgroundColor]: !disabled,
      'inputStepper-inputBorderNegative': error,
      'inputStepper-inputBorderWarning': warning,
      'inputStepper-inputPrefix': prefixIcon || prefixLabel,
      'inputStepper-inputFocused': isFocused && !disabled && !error,
      'backgroundSecondary contentSecondary': disabled,
      contentDisabled: disabled
    }
  );


  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };


  const handleCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disableCopyPaste) {
      e.preventDefault();
    }
  };


  const handleMinus = () => {
    if (value > min && !disabled) {
      onChange(value - step);
    }
  };


  const handlePlus = () => {
    if (value < max && !disabled) {
      onChange(value + step);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!typeable) return;

    const newValue = e.target.value;

    if (newValue === '') {
      setInputValue('');
      onChange(min);

    } else {
      const numValue = Number(newValue);

      if (!isNaN(numValue) && numValue >= min && numValue <= max) {
        setInputValue(newValue);
        onChange(numValue);
      }
    }
  };


  const handleBlur = () => {
    setIsFocused(false);
    if (inputValue === '') {
      setInputValue('0');
      onChange(0);

    } else if (inputValue.startsWith('0') && inputValue !== '0') {
      const numValue = Number(inputValue);

      setInputValue(numValue.toString());
      onChange(numValue);
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress(e);
    }

    if (disableDecimal && e.key === '.') {
      e.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

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
        <div
          className="valign-wrapper"
          data-test-id={`${dataTestId}-minus-container`}
        >
          <TempIconButtonV2
            onClick={handleMinus}
            Icon={MdsIcRemoveMinus}
            disabled={disabled || value <= min}
            size="small"
            dataTestId={`${dataTestId}-minus-button`}
          />
        </div>

        {
          (prefixIcon || prefixLabel) && (
            <div
              className='inputStepper-prefixWrapper'
              data-test-id={`${dataTestId}-prefix-container`}
            >
              {
                prefixIcon && (
                  <div
                    className='inputStepper-prefixIcon'
                    data-test-id={`${dataTestId}-prefix-icon`}
                  >
                    {prefixIcon}
                  </div>
                )
              }
              {
                prefixLabel && (
                  <div
                    className='inputStepper-prefixLabel'
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
          className={`${inputClasses} ${backgroundColor} ${textStyle} ${textColor}`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          disabled={disabled}
          data-test-id={dataTestId}
          ref={inputRef}
          onWheel={handleWheel}
          readOnly={!typeable}
          onKeyDown={handleKeyDown}
          onKeyUp={onKeyUp}
          onCopy={handleCopyPaste}
          onCut={handleCopyPaste}
          onPaste={handleCopyPaste}
        />

        <div
          className="valign-wrapper"
          data-test-id={`${dataTestId}-plus-container`}
        >
          <TempIconButtonV2
            onClick={handlePlus}
            Icon={MdsIcAddPlus}
            disabled={disabled || value >= max}
            size="small"
            dataTestId={`${dataTestId}-plus-button`}
          />
        </div>
      </div>
    </div>
  );
};

export default InputStepper;
