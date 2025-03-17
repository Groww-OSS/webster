import React from 'react';
import { StoryFn } from '@storybook/react';
import TempIconButtonV2, { TempIconButtonV2Props } from '../src/components/atoms/TempIconButtonV2/TempIconButtonV2';
import { MdsIcAddPlus } from '@groww-tech/icon-store/mint-icons';

export default {
  title: 'TempIconButtonV2',
  component: TempIconButtonV2,
  argTypes: {
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' }
  },
  tags: [ 'autodocs' ]
};


const Template: StoryFn<TempIconButtonV2Props> = (args) => (
  <TempIconButtonV2 {...args} />
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
