import React, { useState, useRef } from 'react';
import { StoryFn } from '@storybook/react';
import FreeFormInput, { FreeFormInputProps } from '../src/components/atoms/FreeFormInput/FreeFormInput';
import { MdsIcChevronRight } from '@groww-tech/icon-store/mint-icons';

export default {
  title: 'FreeFormInput',
  component: FreeFormInput,
  argTypes: {
    PrefixIcon: { control: 'text' },
    SuffixIcon: { control: 'text' }
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
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text...',
  value: '',
  error: false,
  errorMessage: '',
  disabled: false,
  clearable: false,
  helperText: 'Helper text here',
  onFocus: () => console.log('Focused'),
  onBlur: () => console.log('Blurred'),
};

export const WithError = Template.bind({});
WithError.args = {
  placeholder: 'Enter text...',
  value: '',
  error: true,
  errorMessage: 'This field is required',
  width: '300px'
};

export const WithClearable = Template.bind({});
WithClearable.args = {
  placeholder: 'Enter text...',
  value: '',
  error: false,
  errorMessage: '',
  clearable: true,
  width: '300px'
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  placeholder: 'Enter text...',
  value: '',
  label: 'Text',
  width: '300px'
};

export const WithPrefixLabels = Template.bind({});
WithPrefixLabels.args = {
  placeholder: 'Enter amount...',
  value: '',
  prefixLabel: '$',
  error: false,
  errorMessage: '',
  width: '300px'
};

export const WithPrefixIcons = Template.bind({});
WithPrefixIcons.args = {
  placeholder: 'Enter text...',
  value: '',
  PrefixIcon: MdsIcChevronRight,
  error: false,
  errorMessage: '',
  width: '300px'
};

export const WithSuffixIcons = Template.bind({});
WithSuffixIcons.args = {
  placeholder: 'Enter text...',
  value: '',
  SuffixIcon: MdsIcChevronRight,
  error: false,
  errorMessage: '',
  width: '300px'
};

export const WithDisabled = Template.bind({});
WithDisabled.args = {
  placeholder: 'Enter text...',
  value: '',
  error: false,
  errorMessage: '',
  disabled: true,
  width: '300px'
};

export const WithPasswordVariant = Template.bind({});
WithPasswordVariant.args = {
  placeholder: 'Enter password...',
  value: '',
  variant: 'password',
  error: false,
  errorMessage: '',
  width: '300px'
};

export const WithNumberVariant = Template.bind({});
WithNumberVariant.args = {
  placeholder: 'Enter number...',
  value: '',
  variant: 'number',
  error: false,
  errorMessage: '',
  width: '300px'
};

export const WithSuffixIconButton = Template.bind({});
WithSuffixIconButton.args = {
  placeholder: 'Enter text...',
  value: '',
  suffixIconButton: { icon: MdsIcChevronRight, onClick: () => console.log('Suffix clicked') },
  error: false,
  errorMessage: '',
  width: '300px'
};

export const WithOnEnterPress = Template.bind({});
WithOnEnterPress.args = {
  placeholder: 'Enter text...',
  value: '',
  error: false,
  errorMessage: '',
  onEnterPress: (e) => console.log('Enter pressed'),
  width: '300px'
};
