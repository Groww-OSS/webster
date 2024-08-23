import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Props as TabsProps } from '../src/components/atoms/Tabs/Tabs';
import { Tabs } from '../src/components/atoms';
import { render } from 'react-dom';

export default {
  title: 'Tabs',
  component: Tabs,
  tags: [ 'autodocs' ]
};

const WALLETS_TABS = [
  {
    width: 168,
    left: 10,
    name: (
      <div style={{ padding: '10px 60px' }}
        className="bodyBaseHeavy"
      >
        DEPOSIT
      </div>
    )
  },
  {
    width: 208,
    left: 180,
    name: (
      <div style={{ padding: '10px 60px' }}
        className="bodyBaseHeavy"
      >
        WITHDRAW
      </div>
    )
  }
];


const Template: StoryFn<TabsProps> = (args) => (
  <Tabs
    {...args}
  />
);

export const Default = {
  render: Template,
  args: {
    data: WALLETS_TABS,
    showBottomBorder: true,
    customStyleTab: '',
    onTabSelect: action('onSelect')
  }
};
