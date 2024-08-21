import React, { useState } from 'react';

import { StoryFn } from '@storybook/react';

import { InputField } from '../src/components/atoms';
import { Props as InputFieldProps } from '../src/components/atoms/InputField/InputField';

export default {
  title: 'InputField',
  component: InputField,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<InputFieldProps> = (args) => {
  const [ value, setValue ] = useState('');


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <InputField {...args}
    value={value}
    onInput={onChange}
  />;
};

export const Primary = {
  render: Template,

  args: {
    label: 'Email'
  }
};

export const Disabled = {
  render: Template,

  args: {
    label: 'Email',
    disabled: true
  }
};

export const Error = {
  render: Template,

  args: {
    label: 'Email',
    showError: true,
    errorText: 'There\'s an error',
    value: 'type something'
  }
};
