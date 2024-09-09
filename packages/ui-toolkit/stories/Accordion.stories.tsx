import React from 'react';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Accordion } from '../src/components/atoms';
import { Props as AccordionProps } from '../src/components/atoms/Accordion/Accordion';

import './style.css';

export default {
  title: 'Accordion',
  component: Accordion,
  tags: [ 'autodocs' ]
};

console.log('Testing changes');


const Template: StoryFn<AccordionProps> = (args) => {
  return (
    <Accordion {...args}>
      <div className="accordion_content_class">Accordion Content</div>
    </Accordion>
  );
};

export const AccordionArgs = {
  render: Template,
  args: {
    title: 'Click To  Expand',
    titleClass: 'contentPrimary bodyLargeHeavy',
    iconClass: '',
    parentClass: 'accordion_parent_class',
    onMountOpen: false,
    showRightIcon: true,
    onToggleCallback: action('toogleCalled')
  }
};
