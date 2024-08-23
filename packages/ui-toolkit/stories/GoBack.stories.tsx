import React from 'react';

import { StoryFn } from '@storybook/react';

import { GoBack } from '../src/components/atoms';
import { Props as GoBackProps } from '../src/components/atoms/GoBack/GoBack';

export default {
  title: 'Go Back',
  component: GoBack,
  tags: [ 'autodocs' ]
};

const CustomGoBack = <div className="bodyBase">Back</div>;


const Template: StoryFn<GoBackProps> = (args) => (
  <GoBack
    {...args}
  />
);

export const Default = {
  render: Template
};

export const Custom = {
  render: Template,
  args: {
    text: CustomGoBack,
    iconWidth: 20,
    iconHeight: 20
  }
};
