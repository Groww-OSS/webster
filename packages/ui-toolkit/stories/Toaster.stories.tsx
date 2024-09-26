import React from 'react';

import { StoryFn } from '@storybook/react';

import { Toaster, toast, Button } from '../src/components/atoms';
import { createPortal } from 'react-dom';

export default {
  title: 'Toaster',
  component: toast,
  tags: [ 'autodocs' ]
};


const Template: StoryFn = (_args) => {
  const activateToast = (type: string) => {
    switch (type) {
      case 'sucess':
        return toast.success({
          title: 'Sucess',
          description: 'Toast Sucess',
          duration: 5000,
          dismissible: true,
          onDismiss: () => console.log('Dismissed'),
          onAutoClose: () => console.log('Auto Close')
        });

      case 'warning':
        return toast.warning({
          description: 'Toast Warn'
        });

      case 'error':
        return toast.error({
          description: 'Toast error'
        });

      case 'info':
        return toast.info({
          description: 'Toast info'
        });

      default:
        toast({ description: 'Default Toast' });
        return;
    }
  };

  const domNode = document.body;

  return (
    <div className="valign-wrapper width100"
      style={{ columnGap: '20px' }}
    >
      <Button
        buttonText="Toast Sucess"
        onClick={() => activateToast('sucess')}
      />

      <Button buttonText="Toast Warn"
        onClick={() => activateToast('warning')}
      />

      <Button
        variant="Negative"
        buttonText="Toast Error"
        onClick={() => activateToast('error')}
      />

      <Button
        buttonText="Toast Info"
        variant="Secondary"
        onClick={() => activateToast('info')}
      />
      {createPortal(<div id="sonner-toast"><Toaster /></div>, domNode)}
    </div>
  );
};

export const Default = {
  render: Template,

  parameters: {
    docs: {
      source: {
        code: `
          import { toast } from '@groww-tech/ui-toolkit';

          const activateToast = (type: string) => {
            switch (type) {
              case 'sucess':
                return toast.success({
                  title: 'Sucess',
                  description: 'Toast Sucess',
                  duration: 5000, //default 6000
                  dismissible: true, //default true
                  closeButton: true, //default true
                  onDismiss: () => console.log('Dismissed'),
                  onAutoClose: () => console.log('Auto Close'),
                  position: 'top-' //options: 'top-right'(default), 'top-left' 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'
                });

              case 'warning':
                return toast.warning({
                  description: 'Toast Warn'
                });

              case 'error':
                return toast.error({
                  description: 'Toast error'
                });

              case 'info':
                return toast.info({
                  description: 'Toast info'
                });

              default:
                toast({ description: 'Default Toast' });
                return;
            }
          };

        return (
          <div className="valign-wrapper width100"
            style={{ columnGap: '20px' }}
          >
            <Button
              buttonText="Toast Sucess"
              onClick={() => activateToast('sucess')}
            />

            <Button buttonText="Toast Warn"
              onClick={() => activateToast('warning')}
            />

            <Button
              variant="Negative"
              buttonText="Toast Error"
              onClick={() => activateToast('error')}
            />

            <Button
              buttonText="Toast Info"
              variant="Secondary"
              onClick={() => activateToast('info')}
            />
          </div>
        );
        `
      }
    }
  }
};
