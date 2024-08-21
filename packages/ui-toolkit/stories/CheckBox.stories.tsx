import React from 'react';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CheckBox } from '../src/components/atoms';
import { Props as CheckBoxProps } from '../src/components/atoms/CheckBox/CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<CheckBoxProps> = (args) => (
  <CheckBox
    {...args}
  />
);

export const Checked = {
  render: Template,
  args: {
    label: 'Check Actions',
    handleOnClick: action('onCheckBoxClick'),
    size: 'Base',
    value: '',
    isChecked: false,
    isDisabled: false,
    checkBoxDirection: 'Left',
    dataTestId: ''
  }
};

export const OnRight = {
  render: Template,
  args: {
    ...Checked.args,
    label: <span style={{ marginRight: '8px' }}>Checkbox</span>,
    checkBoxDirection: 'Right',
    handleOnClick: action('onCheckBoxClick')
  }
};
