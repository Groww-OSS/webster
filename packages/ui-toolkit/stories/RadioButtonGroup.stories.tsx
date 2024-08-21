import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Props as RadioButtonGroupProps } from '../src/components/molecules/RadioButtonGroup/RadioButtonGroup';
import { RadioButtonGroup } from '../src/components/molecules';

export default {
  title: 'RadioButtonGroup',
  component: RadioButtonGroup,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<RadioButtonGroupProps> = (args) => {
  const [ value, setValue ] = useState('');


  const onSelect = (newValue) => {
    if (newValue === value) {
      setValue('');

    } else {
      setValue(newValue);
    }
  };

  return (
    <div className="valign-wrapper">
      <RadioButtonGroup {...args}
        selected={value}
        onSelect={onSelect}
      />
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    containerClassName: '',
    radioButtons: genderArray
  }
};

const genderArray = [
  { label: 'Male', value: 'MALE', size: 'Base', radioDirection: 'Left' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'NA' }
];

export const Custom = {
  render: Template,

  args: {
    radioButtons: switchArray
  }
};

const switchArray = [
  { label: 'On', value: 'ON', radioDirection: 'Right' },
  { label: 'Off', value: 'OFF' }
];
