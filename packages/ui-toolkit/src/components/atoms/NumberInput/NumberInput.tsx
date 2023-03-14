import React from 'react';
import { NumberInputStepper } from './NumberInputStepper';
import BaseNumberInput from './BaseNumberInput';


const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const { showSteper } = props;

  if (showSteper) {
    return <NumberInputStepper
      {...props}
      ref={ref}
    />;
  }

  return <BaseNumberInput
    {...props}
    ref={ref}
  />;
});

export type NumberInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
_NumberInputProps;

export type _NumberInputProps = {
  min?: number;
  max?: number;
  step?: number;
  onChange: React.FormEventHandler<HTMLInputElement>;
  value: string | number;
  variant?: 'warning' | 'error' | 'default' | 'disabled' | 'unstyled';
  showSteper?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  size?: 'small' | 'medium' | 'large';
  allowSpecialCharacters?: boolean;
  disabled?: boolean;
  disableDecimal?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  PrefixComponent?: () => React.ReactNode;
  SuffixComponent?: () => React.ReactNode;
};

export default NumberInput;
