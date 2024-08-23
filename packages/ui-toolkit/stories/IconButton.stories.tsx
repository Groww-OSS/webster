import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import { IconButton } from '../src/components/atoms/IconButton';
import { Props as IconButtonProps } from '../src/components/atoms/IconButton/IconButton';
import { Search } from '@groww-tech/icon-store/mi';

export default {
  title: 'IconButton',
  component: IconButton,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<IconButtonProps> = (args) => {
  const [ isSelected, setSelected ] = useState(false);

  return (
    <div style={{ margin: 8 }}>
      <IconButton {...args}
        onClick={() => setSelected(!isSelected)}
      />
    </div>
  );
};

export const IconButtonArgs = {
  render: Template,

  args: {
    iconComponent: (iconProps: any) => <Search {...iconProps} />,
    size: 'Base',
    isDisabled: false,
    isSelected: false,
    isLoading: false
  }
};
