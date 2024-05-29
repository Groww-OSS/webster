import React from 'react';

import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { MessageBox } from '../src/components/atoms/MessageBox';
import { Props as MessageBoxProps } from '../src/components/atoms/MessageBox/MessageBox';
import { Button } from '../src/components/atoms/Button';

export default {
  title: 'MessageBox',
  component: MessageBox,
  argTypes: {
    background: {
      control: {
        type: 'select',
        options: [ 'Neutral', 'Warning', 'Error', 'Positive' ]
      }
    },
    size: {
      control: {
        type: 'select',
        options: [ 'XSmall', 'Small', 'Base', 'Large', 'XLarge' ]
      }
    }
  }
};


const Template: Story<MessageBoxProps> = (args) => <MessageBox {...args} />;


export const Neutral = Template.bind({});
Neutral.args = {
  background: 'Neutral',
  isCompact: false,
  content: `This is a information box. This can be used for anything,
   from a notice box to a notification box to anything you need it to be!!.
  Just kidding it\'s just a template text to fill up space. :P`
};

export const Warning = Template.bind({});
Warning.args = {
  ...Neutral.args,
  background: 'Warning'
};

export const Error = Template.bind({});
Error.args = {
  ...Neutral.args,
  background: 'Error'
};


export const Positive = Template.bind({});
Positive.args = {
  ...Neutral.args,
  background: 'Positive',
  content: 'This is the body that can span upto three lines. It can contain CTAs in the form of inline links'
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  ...Neutral.args,
  background: 'Neutral',
  isIconPresent: false
};

export const WithActionCTA = Template.bind({});
WithActionCTA.args = {
  ...Neutral.args,
  size: 'Large',
  onContainerClick: action('onContainer Click'),
  actionCTA: <Button
    size="Small"
    buttonText='Button'
    onClick={
      (e: React.MouseEvent) => {
        console.log('Button Click');
        e.stopPropagation();
      }
    }
  />
};

export const WithoutLeadingIcon = Template.bind({});
WithoutLeadingIcon.args = {
  ...Neutral.args,
  isIconPresent: false,
  onContainerClick: action('onContainer Click')
};
