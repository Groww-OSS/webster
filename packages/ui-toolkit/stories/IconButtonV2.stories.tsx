import React from 'react';
import { StoryFn } from '@storybook/react';
import IconButtonV2, { IconButtonProps } from '../src/components/atoms/IconButtonV2/IconButtonV2';
import { MdsIcAddPlus } from '@groww-tech/icon-store/mint-icons';

export default {
  title: 'IconButtonV2',
  component: IconButtonV2,
  argTypes: {
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    isCompact: { control: 'boolean' },
    size: { control: { type: 'radio', options: [ 'small', 'medium', 'large' ] } },
    shape: { control: { type: 'radio', options: [ 'circle', 'square' ] } },
    onClick: { action: 'clicked' }
  },
  tags: [ 'autodocs' ]
};


const Template: StoryFn<IconButtonProps> = (args) => <IconButtonV2 {...args} />;

// Default story with basic props
export const Default = Template.bind({});
Default.args = {
  Icon: MdsIcAddPlus,
  disabled: false,
  isLoading: false,
  size: 'medium',
  isCompact: false
};

// Disabled state
export const Disabled = Template.bind({});
Disabled.args = {
  Icon: MdsIcAddPlus,
  disabled: true,
  isLoading: false,
  size: 'medium',
  isCompact: false
};

// Loading state
export const Loading = Template.bind({});
Loading.args = {
  Icon: MdsIcAddPlus,
  disabled: false,
  isLoading: true,
  size: 'medium',
  isCompact: false
};

// Small size
export const SmallSize = Template.bind({});
SmallSize.args = {
  Icon: MdsIcAddPlus,
  disabled: false,
  isLoading: false,
  size: 'small',
  isCompact: false,
  shape: 'circle'
};

// Large size
export const LargeSize = Template.bind({});
LargeSize.args = {
  Icon: MdsIcAddPlus,
  disabled: false,
  isLoading: false,
  size: 'large',
  isCompact: false,
  shape: 'circle'
};

// Compact mode
export const Compact = Template.bind({});
Compact.args = {
  Icon: MdsIcAddPlus,
  disabled: false,
  isLoading: false,
  size: 'medium',
  isCompact: true
};

// Square shape
export const SquareShape = Template.bind({});
SquareShape.args = {
  Icon: MdsIcAddPlus,
  disabled: false,
  isLoading: false,
  size: 'medium',
  isCompact: false,
  shape: 'square'
};
