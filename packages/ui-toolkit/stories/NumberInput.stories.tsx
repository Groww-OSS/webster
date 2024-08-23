import React from 'react';

import { StoryFn } from '@storybook/react';

import { NumberInput } from '../src/components/atoms';
import { NumberInputProps } from '../src/components/atoms/NumberInput/NumberInput';

export default {
  title: 'NumberInput',
  component: NumberInput,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<NumberInputProps> = (args) => {
  const [ value, setValue ] = React.useState('100');


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <NumberInput {...args}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export const Primary = {
  render: Template,

  args: {
    placeholder: 0
  }
};

export const Warning = {
  render: Template,

  args: {
    value: 100,
    variant: 'warning'
  }
};

export const Error = {
  render: Template,

  args: {
    value: 100,
    variant: 'error'
  }
};

export const Unstyled = {
  render: Template,

  args: {
    placeholder: 0,
    value: 100,
    variant: 'unstyled'
  }
};

export const UnstyledLarge = {
  render: Template,

  args: {
    placeholder: 0,
    value: 100,
    variant: 'unstyled',
    size: 'large'
  }
};

export const DisabledSpecialChar = {
  render: Template,

  args: {
    value: 100,
    allowSpecialCharacters: true
  }
};

export const DisableDecimal = {
  render: Template,

  args: {
    value: 100,
    disableDecimal: true
  }
};

export const RupeeSymbol = {
  render: Template,

  args: {
    value: 100,
    PrefixComponent: () => <span>₹</span>
  }
};

export const Disabled = {
  render: Template,

  args: {
    value: 100,
    variant: 'disabled',
    SuffixComponent: () => <span> %</span>
  }
};

export const StepperControls = {
  render: Template,

  args: {
    value: 100,
    showSteper: true
  }
};

export const StepValue = {
  render: Template,

  args: {
    value: 100,
    step: 5
  }
};

export const MinimumValue = {
  render: Template,

  args: {
    value: 100,
    min: 99,
    step: 5
  }
};

export const MaxValue = {
  render: Template,

  args: {
    value: 100,
    max: 105
  }
};
