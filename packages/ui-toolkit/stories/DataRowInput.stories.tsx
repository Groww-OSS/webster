import React, { useState, useRef } from 'react';
import { StoryFn } from '@storybook/react';
import DataRowInput, { DataRowInputProps } from '../src/components/atoms/DataRowInput/DataRowInput';
import { MdsIcChevronRight } from '@groww-tech/icon-store/mint-icons';

export default {
  title: 'DataRowInput',
  component: DataRowInput,
  argTypes: {
    prefixIcon: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    warning: { control: 'boolean' }
  },
  tags: [ 'autodocs' ]
};


const Template: StoryFn<DataRowInputProps> = (args) => {
  const [ value, setValue ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <DataRowInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      ref={inputRef}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter number...',
  value: '',
  width: '128px'
};

export const WithError = Template.bind({});
WithError.args = {
  placeholder: 'Enter number...',
  value: '',
  error: true,
  width: '300px'
};

export const WithWarning = Template.bind({});
WithWarning.args = {
  placeholder: 'Enter number...',
  value: '',
  warning: true,
  width: '300px'
};

export const WithPrefixLabel = Template.bind({});
WithPrefixLabel.args = {
  placeholder: 'Enter amount...',
  value: '',
  prefixLabel: '$',
  width: '300px'
};

export const WithPrefixIcon = Template.bind({});
WithPrefixIcon.args = {
  placeholder: 'Enter number...',
  value: '',
  PrefixIcon: MdsIcChevronRight,
  width: '300px'
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Enter number...',
  value: '',
  disabled: true,
  width: '300px'
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  placeholder: 'Enter number...',
  value: '',
  width: '200px'
};

export const WithMinMax = Template.bind({});
WithMinMax.args = {
  placeholder: 'Enter number...',
  value: '',
  min: 100,
  max: 2000
};
