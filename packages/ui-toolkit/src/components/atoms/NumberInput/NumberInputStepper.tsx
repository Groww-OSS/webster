import { Add, Remove } from '@groww-tech/icon-store/mi';
import React from 'react';
import { NumberInputProps } from './NumberInput';

import BaseNumberInput from './BaseNumberInput';

export const NumberInputStepper = React.forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  return (
    <BaseNumberInput
      {...props}
      ref={ref}
      PrefixComponent={() => StepPrefixComponent(props)}
      SuffixComponent={() => StepSuffixComponent(props)}
    />
  );
});


const StepSuffixComponent = ({ step = 1, max = Number.POSITIVE_INFINITY, value, onChange }: NumberInputProps) => {
  const numberValue = Number(value);


  const onClick = () => {
    if (max >= numberValue + step) {
      const increasedVal = numberValue + step;
      const floorValue = Math.floor(increasedVal / step) * step;

      // @ts-ignore : to prevent onChange re writing as it can be passed by user
      //we are synthentically generating custome event to set value
      onChange({ target: { value: floorValue } });
    }
  };

  return (
    <Add
      size={28}
      style={{ marginTop: '3px' }}
      className="cur-po"
      onClick={onClick}
    />
  );

};


const StepPrefixComponent = ({ step = 1, min = Number.NEGATIVE_INFINITY, value, onChange }: NumberInputProps) => {

  const numberValue = Number(value);


  const onClick = () => {

    if (min <= numberValue - step) {
      const increasedVal = numberValue - step;
      const floorValue = Math.floor(increasedVal / step) * step;

      // @ts-ignore : to prevent onChange re writing as it can be passed by user
      //we are synthentically generating custome event to set value
      onChange({ target: { value: floorValue } });
    }
  };

  return (
    <Remove
      size={28}
      style={{ marginTop: '3px' }}
      className="cur-po"
      onClick={onClick}
    />
  );
};
