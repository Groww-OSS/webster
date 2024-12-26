import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import './styles/index.css';
import { ReactIconComponentType } from '@groww-tech/icon-store/types.d';
import { MdsIcRemoveMinus, MdsIcAddPlus } from '@groww-tech/icon-store/mint-icons';
import IconButtonV2 from '../IconButtonV2/IconButtonV2';
import { ContentMintTokens } from '../../../types/mint-token-types/content-mint-tokens';
import { BackgroundMintTokens } from '../../../types/mint-token-types/background-mint-tokens';

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
  typable?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  textStyle?: 'bodyLarge' | 'bodyLargeHeavy';
  backgroundColor?: BackgroundMintTokens;
  textColor?: ContentMintTokens;
  shouldFocusOnMount?: boolean;
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
  typable = true,
  onKeyDown,
  onKeyUp,
  textStyle = 'bodyLarge',
  backgroundColor = 'backgroundTransparent',
  textColor = 'contentPrimary',
  shouldFocusOnMount = false
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

  const inputClasses = cn('inputStepper-input');
  const inputWrapperClasses = cn('inputStepper-inputWrapper');


  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const inputContentClasses = cn(
    `inputStepper-inputContent ${textStyle} ${textColor} borderPrimary`,
    {
      [backgroundColor]: !disabled,
      'inputStepper-inputBorderNegative': error,
      'inputStepper-inputBorderWarning': warning,
      'inputStepper-inputPrefix': prefixIcon || prefixLabel,
      'inputStepper-inputFocused': isFocused && !disabled && !error,
      'backgroundSecondary contentSecondary': disabled
    }
  );


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
    if (!typable) return;

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

  return (
    <div className={inputWrapperClasses}
      style={{ width: width }}
    >
      <div className={`${inputContentClasses}`}>
        <div className="inputStepper-prefixContainer">
          <IconButtonV2
            onClick={handleMinus}
            Icon={MdsIcRemoveMinus}
            disabled={disabled || value <= min}
            size='md'
            isCompact={true}
          />
        </div>

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
          data-testid={dataTestId}
          ref={inputRef}
          onWheel={handleWheel}
          readOnly={!typable}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />

        <div className="inputStepper-suffixContainer">
          <IconButtonV2
            onClick={handlePlus}
            Icon={MdsIcAddPlus}
            disabled={disabled || value >= max}
            size='md'
            isCompact={true}
          />
        </div>
      </div>
    </div>
  );
};

export default InputStepper;
