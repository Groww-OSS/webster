import React from 'react';
import BaseTextInputV1 from './BaseTextInputV1';
import { Cancel } from '@groww-tech/icon-store/mi';
import { TextInputProps } from './TextInputV1';

const ClerableTextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { value, onChange } = props;

  return (
    <BaseTextInputV1
      ref={ref}
      {...props}
      SuffixComponent={() => ClearableTextInputTrailingVisual({ value, onChange })}
    />
  );
});


const ClearableTextInputTrailingVisual = ({ value, onChange }: Pick<TextInputProps, 'value' | 'onChange'>) => {
  const e: React.ChangeEvent<HTMLInputElement> = { target: { value: '' } } as any;

  if (!value) return null;
  return (
    <Cancel
      onClick={() => { onChange(e); }}
      size={18}
    />
  );
};

export default ClerableTextInput;
