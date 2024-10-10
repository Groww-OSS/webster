import React, { useState, useRef } from 'react';
import { StoryFn } from '@storybook/react';
import InputStepper, { InputStepperProps } from '../src/components/atoms/InputStepper/InputStepper';

export default {
  title: 'InputStepper',
  component: InputStepper,
  argTypes: {
    prefixIcon: { control: 'text' },
    error: { control: 'boolean' },
    warning: { control: 'boolean' },
    disabled: { control: 'boolean' },
    typable: { control: 'boolean' }
  },
  tags: [ 'autodocs' ]
};


const Template: StoryFn<InputStepperProps> = (args) => {
  const [ value, setValue ] = useState(args.value || 0);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputStepper
      {...args}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      ref={inputRef}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: '0',
  value: 0,
  width: '128px'
};

export const WithError = Template.bind({});
WithError.args = {
  placeholder: '0',
  value: 0,
  error: true,
  width: '300px'
};

export const WithWarning = Template.bind({});
WithWarning.args = {
  placeholder: '0',
  value: 0,
  warning: true,
  width: '300px'
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Enter number...',
  value: 0,
  disabled: true,
  width: '300px'
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  placeholder: '0',
  value: 0,
  width: '200px'
};

export const WithMinMax = Template.bind({});
WithMinMax.args = {
  placeholder: '0',
  value: 100,
  min: 100,
  max: 2000
};

export const CustomStep = Template.bind({});
CustomStep.args = {
  placeholder: '0',
  value: 0,
  step: 10
};

export const NonTypable = Template.bind({});
NonTypable.args = {
  placeholder: '0',
  value: 0,
  typable: false
};
