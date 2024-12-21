import React, { useState } from 'react';

import { StoryFn } from '@storybook/react';

import { NumberPicker } from '../src/components/atoms';
import { Props as NumberPickerProps } from '../src/components/atoms/NumberPicker/NumberPicker';

export default {
  title: 'NumberPicker',
  component: NumberPicker,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<NumberPickerProps> = (args) => {
  const [ value, setValue ] = useState(1);

  return (
    <NumberPicker
      {...args}
      value={value}
      stepValue={1}
      minValue={1}
      onInput={(val) => setValue(val)}
    />
  );
};

export const Primary = {
  render: Template,

  args: {
    minValue: 1,
    stepValue: 1,
    variant: 'default'
  }
};

export const Warning = {
  render: Template,

  args: {
    minValue: 1,
    stepValue: 1,
    variant: 'warning'
  }
};

export const Error = {
  render: Template,

  args: {
    minValue: 1,
    stepValue: 1,
    variant: 'error'
  }
};

export const Default = {
  render: Template,

  args: {
    minValue: 1,
    stepValue: 1,
    variant: 'default'
  }
};

export const Disabled = {
  render: Template,

  args: {
    minValue: 1,
    stepValue: 1,
    variant: 'disabled'
  }
};

export const Unstyled = {
  render: Template,

  args: {
    minValue: 1,
    stepValue: 1,
    variant: 'unstyled'
  }
};
