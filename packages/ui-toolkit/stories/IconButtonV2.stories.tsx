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
  icon: <MdsIcAddPlus />,
  disabled: false
};

export const Disabled = Template.bind({});
Disabled.args = {
  icon: <MdsIcAddPlus />,
  disabled: true
};

export const WithHeartIcon = Template.bind({});
WithHeartIcon.args = {
  icon: <MdsIcAddPlus color="red" />,
  disabled: false
};

export const WithSearchIcon = Template.bind({});
WithSearchIcon.args = {
  icon: <MdsIcAddPlus />,
  disabled: false
};

export const WithTrashIcon = Template.bind({});
WithTrashIcon.args = {
  icon: <MdsIcAddPlus color="red" />,
  disabled: false
};
