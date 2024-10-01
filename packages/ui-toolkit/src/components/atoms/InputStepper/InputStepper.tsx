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
  variant?: 'default' | 'error' | 'warning' | 'disabled';
  min?: number;
  max?: number;
  step?: number;
  typable?: boolean;
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
  variant = 'default',
  min = 0,
  max = 100,
  step = 1,
  typable = true
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
      'inputBorderNegative': variant === 'error',
      'inputBorderWarning': variant === 'warning',
      'inputPrefix': prefixIcon || prefixLabel,
      'inputFocused': isFocused && variant !== 'disabled' && variant !== 'error',
      'backgroundSecondary borderPrimary contentSecondary': variant === 'disabled'
    }
  );


  const handleMinus = () => {
    if (value > min!) {
      onChange(value - step);
    }
  };


  const handlePlus = () => {
    if (value < max!) {
      onChange(value + step);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);

    if (newValue >= min! && newValue <= max!) {
      onChange(newValue);
    }
  };

  return (
    <div className={inputWrapperClasses}
      style={{ width: width }}
    >
      <div className={`${inputContentClasses}`}>
        <div className="prefixContainer">
          {/* <button className="prefixIcon"
            onClick={handleMinus}
            disabled={value <= min}
          >
            <MdsIcRemoveMinus />
          </button> */}
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
          disabled={variant === 'disabled'}
          data-testid={dataTestId}
          ref={ref}
          onWheel={handleWheel}
          min={min}
          max={max}
          step={step}
          readOnly={!typable}
        />

        <div className="suffixContainer">
          {/* <button className="inputSuffixIcon"
            onClick={handlePlus}
            disabled={value >= max}
            tabIndex={0}
          >
            <MdsIcAddPlus />
          </button> */}
          <MdsIcAddPlus onClick={handlePlus}/>
        </div>
      </div>
    </div>
  );
};

export default InputStepper;
