import React, { useState } from 'react';
import cn from 'classnames';
import './styles/index.css';
import { ReactIconComponentType } from '@groww-tech/icon-store/types.d';
import { MdsIcRemoveMinus, MdsIcAddPlus } from '@groww-tech/icon-store/mint-icons';

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
  max = 100,
  step = 1,
  typable = true,
  onKeyDown
}) => {
  const [ isFocused, setIsFocused ] = useState(false);

  const inputClasses = cn('input');
  const inputWrapperClasses = cn('inputWrapper');


  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const inputContentClasses = cn(
    'inputContent backgroundPrimary contentPrimary borderPrimary',
    {
      'inputBorderNegative': error,
      'inputBorderWarning': warning,
      'inputPrefix': prefixIcon || prefixLabel,
      'inputFocused': isFocused && !disabled && !error,
      'backgroundSecondary borderPrimary contentSecondary': disabled
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
    const newValue = Number(e.target.value);

    if (newValue >= min && newValue <= max && !disabled) {
      onChange(newValue);
    }
  };

  return (
    <div className={inputWrapperClasses}
      style={{ width: width }}
    >
      <div className={`${inputContentClasses}`}>
        <div className="prefixContainer">
          <MdsIcRemoveMinus onClick={handleMinus}/>
        </div>

        <input
          className={`${inputClasses} bodyBase contentPrimary`}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          data-testid={dataTestId}
          ref={ref}
          onWheel={handleWheel}
          min={min}
          max={max}
          step={step}
          readOnly={!typable}
          onKeyDown={onKeyDown}
        />

        <div className="suffixContainer">
          <MdsIcAddPlus onClick={handlePlus}/>
        </div>
      </div>
    </div>
  );
};

export default InputStepper;
