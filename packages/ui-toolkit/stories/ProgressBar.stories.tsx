import React from 'react';
import { StoryObj, StoryFn } from '@storybook/react';

import { ProgressBar } from '../src/components/atoms';
import { Props as ProgressBarProps } from '../src/components/atoms/ProgressBar';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
  tags: [ 'autodocs' ]
};

export const Template: StoryObj<ProgressBarProps> = {
  render: (args) => {
    return (
      <div style={{ margin: 24 }}>
        <ProgressBar completedValue={30}
          {...args}
        />
      </div>
    );
  },

  args: {
    name: 'Demo ProgressBar',
    color: 'var(--purple500)',
    fillerThickness: 10,
    size: 420
  }
};
