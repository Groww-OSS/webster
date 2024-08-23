import React from 'react';

import { StoryFn } from '@storybook/react';

import { Calendar } from '../src/components/molecules';
import { Props as CalendarProps, CALENDAR_TYPE } from '../src/components/molecules/Calendar/Calendar';

export default {
  title: 'Calendar',
  component: Calendar,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<CalendarProps> = (args) => (
  <Calendar {...args} />
);

export const Month = {
  render: Template,
  args: {
    type: CALENDAR_TYPE.MONTH
  }
};

export const Date = {
  render: Template,
  args: {
    type: CALENDAR_TYPE.DATE
  }
};
