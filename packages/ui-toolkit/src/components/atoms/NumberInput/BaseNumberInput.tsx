import React from 'react';

import { KEYBOARD_EVENTS } from '../../../utils/constant';
import { preventDefaultEventBehaviour, preventNumberInputWheelChangeOnBlur, preventNumberInputWheelChangeOnFocus } from './helpers';
import { NumberInputProps } from './NumberInput';
import './styles.css';

const BaseNumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const {
    SuffixComponent = null,
    PrefixComponent = null,
    value = 0,
    onChange,
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    step = 1,
    allowSpecialCharacters = false,
    disableDecimal = false,
    onKeyDown = () => { }
  } = props;
  const { size, disableScroll = true, showSteper, ...rest } = props;

  const numberValue = Number(value);


  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };


  const _onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const preventSpecialChar = (allowSpecialCharacters && [ '+', '-', 'e' ].includes(e.key));
    const preventDecimal = disableDecimal && [ '.' ].includes(e.key);
    const preventDoubleDecimal = (e.key === '.' && value.toString().includes('.'));

    const isDelete = e.code === KEYBOARD_EVENTS.delete || e.code === KEYBOARD_EVENTS.backspace || e.key === KEYBOARD_EVENTS.delete || e.key === KEYBOARD_EVENTS.backspace;
    const isArrowKey = /^Arrow/.test(e.code) || /^Arrow/.test(e.key);
    const isValidKey = /^[0-9]*$/.test(e.key) || /^\./.test(e.key) || isDelete || isArrowKey;

    if (!isValidKey || preventSpecialChar || preventDecimal || preventDoubleDecimal) {
      e.preventDefault();
    }

    if (e.key === KEYBOARD_EVENTS.arrowDown) {
      onDecrement();
    }

    if (e.key === KEYBOARD_EVENTS.arrowUp) {
      onIncrement();
    }

    onKeyDown(e);
  };


  const onIncrement = () => {
    if (max >= numberValue + step) {
      const increasedVal = numberValue + step;
      const floorValue = Math.floor(increasedVal / step) * step;

      onChange({ target: { value: floorValue } } as any);
    }
  };


  const onDecrement = () => {
    if (min <= numberValue - step) {
      const increasedVal = numberValue - step;
      const floorValue = Math.floor(increasedVal / step) * step;

      onChange({ target: { value: floorValue } } as any);
    }
  };

  let restPropsUpdated = { ...rest };


  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    preventNumberInputWheelChangeOnFocus(e, preventDefaultEventBehaviour);
  };


  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    preventNumberInputWheelChangeOnBlur(e, preventDefaultEventBehaviour);
  };

  if (disableScroll) {
    restPropsUpdated = {
      ...restPropsUpdated,
      onFocus,
      onBlur
    };
  }

  const containerClassName = `number-input-container ${props.variant || 'default'}`;
  const inputClassName = `number-input ${calculateInputClass(size)} ${props.variant || 'default'} ${showSteper ? 'show-stepper' : ''}`;

  return (
    <div className={containerClassName}>
      {PrefixComponent && <span>{PrefixComponent()}</span>}
      <input
        className={inputClassName}
        max={max}
        min={min}
        onKeyDown={_onKeyDown}
        type="number"
        {...restPropsUpdated}
        onChange={_onChange}
        ref={ref}
      />
      {SuffixComponent && <span>{SuffixComponent()}</span>}
    </div>
  );
});


const calculateInputClass = (size: NumberInputProps['size']): string => {
  switch (size) {
    case 'small':
      return 'bodyLargeHeavy';

    case 'medium':
      return 'bodyXLargeHeavy';

    case 'large':
      return 'headingLarge';

    default:
      return 'bodyXLargeHeavy';
  }
};

export default BaseNumberInput;
