import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, Popup } from '../src/components/atoms';
import { Props as PopupProps } from '../src/components/atoms/Popup/Popup';

export default {
  title: 'Popup',
  component: Popup,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<PopupProps> = ({ visible, onClose, ...args }) => {
  const [ toggle, setToggle ] = useState(false);

  return (
    <>
      <Button buttonText="Open Popup"
        onClick={() => setToggle(true)}
      />
      <Popup visible={toggle}
        onClose={() => setToggle(false)}
        {...args}
      >
        <div className="absolute-center"
          style={{ minHeight: 64 }}
        >
          Some Random Content
        </div>
      </Popup>
    </>
  );
};

export const Basic = {
  render: Template,

  args: {
    width: 360,
    closeOnEsc: action('onEscClick'),
    closeMaskOnClick: action('onMaskClick'),
    showCloseButton: true
  }
};
