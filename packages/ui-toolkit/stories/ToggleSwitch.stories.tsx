import React from 'react';
import { StoryFn } from '@storybook/react';

import { Props as ToggleSwitchProps } from '../src/components/atoms/ToggleSwitch/ToggleSwitch';
import { ToggleSwitch } from '../src/components/atoms';

export default {
  title: 'ToggleSwitch',
  component: ToggleSwitch,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<ToggleSwitchProps> = (args) => {
  const [ isChecked, setIsChecked ] = React.useState(args.isActive);


  const onChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div className="valign-wrapper">
      <ToggleSwitch {...args}
        isActive={isChecked}
        onChange={onChange}
      />
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    size: 'Base',
    leftText: '',
    rightText: '',
    isActive: false,
    isDisabled: false
  }
};

export const WithText = {
  render: Template,

  args: {
    ...Default.args,
    leftText: <div style={{ marginRight: 10 }}>Off</div>,
    rightText: <div style={{ marginLeft: 10 }}>On</div>
  }
};

export const SwitchCircle = {
  render: Template,

  args: {
    ...Default.args
  }
};
