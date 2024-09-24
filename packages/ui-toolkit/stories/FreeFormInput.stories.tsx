import React, { useState, useRef } from 'react';
import { StoryFn } from '@storybook/react';
import FreeFormInput, { FreeFormInputProps } from '../src/components/atoms/FreeFormInput/FreeFormInput';
import { ChevronRight } from '@groww-tech/icon-store/mi';

export default {
  title: 'FreeFormInput',
  component: FreeFormInput,
  argTypes: {
    prefixIcon: { control: 'text' },
    suffixIcon: { control: 'text' }
  },
  tags: [ 'autodocs' ]

};


const Template: StoryFn<FreeFormInputProps> = (args) => {
  const [ value, setValue ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <FreeFormInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      ref={inputRef}
      prefixIcon={
        <ChevronRight
          size={48}
          className='contentAccent'
        />
      }

    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text...',
  value: '',
  error: { hasError: false, message: '' },
  warning: { hasWarning: false, message: '' },
  disabled: false,
  clearable: false,
  width: '300px',
  helperText: 'Helper text here',
  prefixIcon: (iconProps: any) => <ChevronRight {...iconProps} />
};

export const WithError = Template.bind({});
WithError.args = {
  placeholder: 'Enter text...',
  value: '',
  error: { hasError: true, message: 'This field is required' },
  warning: { hasWarning: false, message: '' },
  width: '300px'
};

export const WithWarning = Template.bind({});
WithWarning.args = {
  placeholder: 'Enter text...',
  value: '',
  error: { hasError: false, message: '' },
  warning: { hasWarning: true, message: 'This might be a warning' },
  width: '300px'
};

export const WithPrefixAndSuffixLabels = Template.bind({});
WithPrefixAndSuffixLabels.args = {
  placeholder: 'Enter amount...',
  value: '',
  prefixLabel: '$',
  suffixLabel: '.00',
  error: { hasError: false, message: '' },
  warning: { hasWarning: false, message: '' },
  width: '300px'
};
