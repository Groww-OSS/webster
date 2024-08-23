import React, { useState } from 'react';

import { KeyboardArrowDown } from '@groww-tech/icon-store/mi';

import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import { Dropdown, DropdownContent, DropdownTrigger } from '../src/components/atoms';
import { Props as DropdownProps } from '../src/components/atoms/Dropdown/Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<DropdownProps> = (args) => {
  return (
    <Dropdown {...args}>
      <DropdownTrigger>
        <span className="story_dropdown_trigger headingLarge">
          Domains
          <KeyboardArrowDown />
        </span>
      </DropdownTrigger>
      <DropdownContent>
        <div className="borderPrimary backgroundSurfacePrimary bodyBase">
          <div className="story_dropdown_item backgroundPrimary">Finance</div>
          <div className="story_dropdown_item backgroundPrimary">Marketing</div>
          <div className="story_dropdown_item backgroundPrimary">
            Engineering
          </div>
        </div>
      </DropdownContent>
    </Dropdown>
  );
};

export const Default = {
  render: Template,

  args: {
    onHide: action('onHide'),
    onShow: action('onShow')
  }
};

export const DropdownIconAnimation = {
  render: (args) => {
    const [ iconOrientation, setIconOrientation ] = useState('up');

    return (
      <Dropdown
        {...args}
        onShow={
          () => {
            setIconOrientation('down');
          }
        }
        onHide={
          () => {
            setIconOrientation('up');
          }
        }
      >
        <DropdownTrigger>
          <span className="story_dropdown_trigger bodyXLarge">
            Domains
            <KeyboardArrowDown
              className={`story_dropdown_icon story_dropdown_icon_${iconOrientation}`}
            />
          </span>
        </DropdownTrigger>
        <DropdownContent>
          <div className="borderPrimary backgroundSurfacePrimary bodyBase">
            <div className="story_dropdown_item backgroundPrimary">Finance</div>
            <div className="story_dropdown_item backgroundPrimary">
              Marketing
            </div>
            <div className="story_dropdown_item backgroundPrimary">
              Engineering
            </div>
          </div>
        </DropdownContent>
      </Dropdown>
    );
  },

  parameters: {
    docs: {
      source: {
        code: `
        const [iconOrientation, setIconOrientation] = useState('up')

    return (
      <Dropdown
        {...args}
        onShow={() => { setIconOrientation('down') }}
        onHide={() => { setIconOrientation('up') }}
      >
        <DropdownTrigger>
          <span className="headingLarge story_dropdown_trigger">Domains
            <KeyboardArrowDown className={"story_dropdown_icon story_dropdown_icon_{iconOrientation}"} />
          </span>
        </DropdownTrigger>
        <DropdownContent>
          <div className="borderPrimary backgroundSurfacePrimary">
            <div>Finance</div>
            <div>Marketing</div>
            <div>Engineering</div>
          </div>
        </DropdownContent>
      </Dropdown>
    );
        `
      }
    }
  }
};
