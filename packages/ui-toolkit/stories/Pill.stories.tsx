import React from 'react';

import { ArrowDropDown, Cancel, Sort } from '@groww-tech/icon-store/mi';
import { ReactIconProps } from '@groww-tech/icon-store';

import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import { Pill } from '../src/components/atoms';
import { Props as PillProps } from '../src/components/atoms/Pill/Pill';

import './style.css';

export default {
  title: 'Pill',
  component: Pill,
  tags: [ 'autodocs' ]
};

export const Text = {
  args: {
    text: 'Pill label',
    size: 'Base',
    onClick: action('onPillClick'),
    isSelected: false,
    isAccent: true,
    isOutlined: true
  }
};

export const WithLeadingIcon = {
  args: {
    ...Text.args,
    leadingIcon: (iconProps: ReactIconProps) => <Sort {...iconProps} />
  }
};

export const WithTrailingIcon = {
  args: {
    ...Text.args,
    trailingIcon: (iconProps: ReactIconProps) => (
      <ArrowDropDown {...iconProps} />
    )
  }
};
