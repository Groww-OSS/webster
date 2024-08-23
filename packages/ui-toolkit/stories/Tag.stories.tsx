import React from 'react';

import { StoryFn } from '@storybook/react';

import { Tag } from '../src/components/atoms';
import { Props as TagProps } from '../src/components/atoms/Tag/Tag';

export default {
  title: 'Tag',
  component: Tag,
  tags: [ 'autodocs' ]
};

const tagText = '0 shares are available to sell';


const Template: StoryFn<TagProps> = (args) => (
  <Tag {...args}>
    <div className="absolute-center">{tagText}</div>
  </Tag>
);

export const Warning = {
  render: Template
};

export const Error = {
  render: Template,

  args: {
    isWarning: false,
    isError: true,
    isInfo: false
  }
};

export const Info = {
  render: Template,

  args: {
    isWarning: false,
    isError: false,
    isInfo: true
  }
};
