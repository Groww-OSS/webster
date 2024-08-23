import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Props as RadioButtonProps } from '../src/components/atoms/RadioButton/RadioButton';
import { RadioButton } from '../src/components/atoms';

export default {
  title: 'RadioButton',
  component: RadioButton,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<RadioButtonProps> = (args) => {
  const [ selected, setSelected ] = useState(false);


  const onSelect = () => {
    setSelected(!selected);
    return action('On Select');
  };

  return <RadioButton {...args}
    isSelected={selected}
    onSelect={onSelect}
  />;
};

export const Default = {
  render: Template,

  args: {
    label: 'Radio Button Label',
    isSelected: true
  }
};

export const unSelected = {
  render: Template
};

export const OnRight = {
  render: Template,

  args: {
    ...Default.args,
    label: <span>Radio Button</span>,
    radioDirection: 'Right'
  }
};
