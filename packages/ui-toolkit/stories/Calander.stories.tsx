import React from 'react';
import { StoryFn } from '@storybook/react';
import { Calendar } from '../src/components/molecules';
import { Props as CalendarProps, CALENDAR_TYPE } from '../src/components/molecules/Calendar/Calendar';

export default {
  title: 'Calendar',
  component: Calendar,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<CalendarProps> = (args) => <Calendar {...args} />;

export const CalendarStory = {
  render: (args) => {
    const updatedArgs = { ...args };

    // Adjust props based on the selected type (MONTH or DATE)
    if (args.type === CALENDAR_TYPE.MONTH) {
      updatedArgs.minMonth = new Date(args.minMonth);
      updatedArgs.maxMonth = new Date(args.maxMonth);

    } else if (args.type === CALENDAR_TYPE.DATE) {
      updatedArgs.minDate = new Date(args.minDate);
      updatedArgs.maxDate = new Date(args.maxDate);
    }

    return <Template {...updatedArgs} />;
  },
  args: {
    type: CALENDAR_TYPE.MONTH,
    minMonth: new Date(2021, 6, 6),
    maxMonth: new Date(2031, 9, 6),
    minDate: new Date(2021, 6, 6),
    maxDate: new Date(2031, 6, 20)
  },
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(CALENDAR_TYPE)
    },
    minMonth: {
      control: 'date',
      if: { arg: 'type', eq: CALENDAR_TYPE.MONTH } // Only show when MONTH type is selected
    },
    maxMonth: {
      control: 'date',
      if: { arg: 'type', eq: CALENDAR_TYPE.MONTH } // Only show when MONTH type is selected
    },
    minDate: {
      control: 'date',
      if: { arg: 'type', eq: CALENDAR_TYPE.DATE } // Only show when DATE type is selected
    },
    maxDate: {
      control: 'date',
      if: { arg: 'type', eq: CALENDAR_TYPE.DATE } // Only show when DATE type is selected
    }
  }
};
