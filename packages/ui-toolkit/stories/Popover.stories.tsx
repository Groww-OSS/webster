import React from 'react';
import { StoryFn } from '@storybook/react';

import { Popover, POPOVER_POSITIONS } from '../src/components/atoms';
import { Props as PopoverProps } from '../src/components/atoms/Popover/Popover';

export default {
  title: 'Popover',
  component: Popover,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<PopoverProps> = ({ content, direction, ...args }) => {
  return (
    <Popover content={content}
      direction={direction}
    >
      <div className="absolute-center">Hover Me</div>
    </Popover>
  );
};

export const Right = {
  render: Template,

  args: {
    content: POPOVER_POSITIONS.RIGHT,
    direction: POPOVER_POSITIONS.RIGHT
  }
};

export const Bottom = {
  render: Template,

  args: {
    content: POPOVER_POSITIONS.BOTTOM,
    direction: POPOVER_POSITIONS.BOTTOM
  }
};
