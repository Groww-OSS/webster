import React from 'react';

import { StoryFn } from '@storybook/react';

import { Toaster, toast, Button } from '../src/components/atoms';
import { createPortal } from 'react-dom';

import { ToastT as ToastProps } from '../src/components/atoms/Toaster/types';

export default {
  title: 'Toaster',
  component: toast,
  tags: [ 'autodocs' ],
  argTypes: {
    type: {
      options: [ 'success', 'warning', 'error', 'info' ],
      control: { type: 'radio' },
      description: 'add type of toast while triggering a toast like toast.success, toast.warning, toast.error, toast.info'
    },
    title: {
      control: { type: 'text' },
      defaultValue: '',
      description: 'title message for the toast',
      table: {
        defaultValue: { summary: '' }
      }
    },
    description: {
      control: { type: 'text' },
      defaultValue: '',
      description: 'description message for the toast',
      table: {
        defaultValue: { summary: '' }
      }
    },
    duration: {
      control: { type: 'number', step: 1000, min: 1000 },
      defaultValue: 6000,
      required: false,
      description: 'duration of the toast in miliseconds',
      table: {
        defaultValue: { summary: 6000 }
      }
    },
    dismissible: {
      control: { type: 'boolean' },
      defaultValue: true,
      description: `for false value toast will not be dismissed manually from toast close button and auto dismissed after given duration,
      for true value toast can be dismissed manually from close button of the toast`,
      table: {
        defaultValue: { summary: true }
      }
    },
    closeButton: {
      control: { type: 'boolean' },
      defaultValue: true,
      description: 'show close button on toast',
      table: {
        defaultValue: { summary: true }
      }
    },
    onDismiss: {
      control: false,
      description: 'callback function on dismiss of toast',
      type: { name: 'function', required: false }
    },
    onAutoClose: {
      control: false,
      description: 'callback function on auto close of toast',
      type: { name: 'function', required: false }
    }
  }
};


const Template: StoryFn<ToastProps> = (args) => {
  const {
    type,
    title = '',
    description = 'default toast description',
    duration = 5000,
    dismissible,
    closeButton
  } = args;


  const triggerToast = () => {
    if (type) {
      toast[type]({
        title,
        description,
        duration,
        dismissible,
        closeButton,
        onDismiss: () => console.log('Dismissed'),
        onAutoClose: () => console.log('Auto Close')
      });
    }
  };

  const domNode = document.body;

  return (
    <div className="valign-wrapper width100"
      style={{ columnGap: '20px' }}
    >
      <Button
        buttonText={`trigger ${type || 'default'} toast`}
        variant="Secondary"
        onClick={triggerToast}
      />
      {createPortal(<div id="sonner-toast"><Toaster /></div>, domNode)}
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    type: 'info',
    duration: 5000,
    title: 'title text',
    description: 'toast description message',
    dismissible: true,
    closeButton: true
  },
  parameters: {
    docs: {
      source: {
        code: `
          import { toast } from '@groww-tech/ui-toolkit';

const triggerToastMsg = () => {
  toast.info({                            //replace info with required options <success | warning | error | info>
    title: 'toast title message',
    description: 'toast description message',
    duration: 5000, //default 6000
    dismissible: true, //default true
    closeButton: true, //default true
    onDismiss: () => console.log('Dismissed'),
    onAutoClose: () => console.log('Auto Close'),
    position: 'top-right' //options: 'top-right'(default), 'top-left' 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'
  });
};

return (
  <div className="valign-wrapper width100"
    style={{ columnGap: '20px' }}
  >
    <Button
      buttonText="Toast Sucess"
      onClick={triggerToastMsg}
    />
  </div>
);
        `
      }
    }
  }
};
