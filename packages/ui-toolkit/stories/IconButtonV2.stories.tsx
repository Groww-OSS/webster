import React from 'react';
import { StoryFn } from '@storybook/react';
import IconButtonV2, { IconButtonProps } from '../src/components/atoms/IconButtonV2/IconButtonV2';
import { MdsIcAddPlus } from '@groww-tech/icon-store/mint-icons';

export default {
  title: 'IconButtonV2',
  component: IconButtonV2,
  argTypes: {
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' }
  },
  tags: [ 'autodocs' ]
};


const Template: StoryFn<IconButtonProps> = (args) => (
  <IconButtonV2 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  Icon: MdsIcAddPlus,
  disabled: false
};

export const Disabled = Template.bind({});
Disabled.args = {
  Icon: MdsIcAddPlus,
  disabled: true
};
