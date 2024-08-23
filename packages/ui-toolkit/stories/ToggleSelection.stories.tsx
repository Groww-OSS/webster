import React from 'react';


import { StoryFn } from '@storybook/react';

import { ToggleSelection } from '../src/components/atoms';
import { Props as ToggleSelectionProps } from '../src/components/atoms/ToggleSelection/ToggleSelection';

export default {
  title: 'ToggleSelection',
  component: ToggleSelection,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<ToggleSelectionProps> = (args) => {
  const [ isActive, setIsActive ] = React.useState(true);


  const alterActive = (_val: boolean) => {
    setIsActive(!isActive);
  };

  return (
    <ToggleSelection {...args}
      isActive={isActive}
      onChange={alterActive}
    />
  );
};

export const Default = {
  render: Template,

  args: {
    parentClass: 'cur-po'
  }
};

export const Custom = {
  render: Template,

  args: {
    parentClass: 'cur-po',
    leftText: 'English',
    rightText: 'हिन्दी',
    activeBackgroundColor: 'var(--red500)',
    inactiveBackgroundColor: 'var(--yellow500)'
  }
};
