import React from 'react';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Props as TextAreaProps } from '../src/components/atoms/TextArea/TextArea';
import { TextArea } from '../src/components/atoms';

export default {
  title: 'TextArea',
  component: TextArea,
  tags: [ 'autodocs' ],
  argTypes: {
    disabled: {
      default: false,
      control: {
        type: 'select'
      },
      options: [ true, false ]
    },
    label: {
      control: 'text'
    },
    error: {
      control: 'text'
    },
    disableCopyPaste: {
      type: 'select',
      options: [ true, false ]
    }
  }
};


const Template: StoryFn<TextAreaProps> = (args) => {
  const [ value, setValue ] = React.useState('');

  // for two way binding, since TextArea is a controlled component
  const onChange = (e: any) => {
    const newValue = e.target.value;

    setValue(newValue);
  };

  return <TextArea {...args}
    value={value}
    onChange={onChange}
  />;
};

export const Basic = {
  render: Template,

  args: {
    id: 'textarea',
    rows: 5,
    cols: 10,
    disabled: false,
    labelStyle: {},
    errorStyle: {},
    textAreaStyle: {},
    parentDivClass: '',
    disableCopyPaste: false,
    placeholder: 'start typing here',

    onFocus: action('onFocus'),
    onKeyDown: action('onKeyDown'),
    onKeyPress: action('onKeyPress')
  }
};

export const Disabled = {
  render: Template,

  args: {
    ...Basic.args,
    label: 'Text Area Disabled',
    disabled: true
  }
};

export const Error = {
  render: Template,

  args: {
    ...Basic.args,
    label: 'label',
    error: 'Oops!! some error occured'
  }
};

export const Custom = {
  render: Template,

  args: {
    ...Basic.args,
    label: 'Custom Text Area Label',
    rows: 10,
    cols: 25,
    labelStyle: {
      color: 'green'
    },
    textAreaStyle: {
      border: '2px solid green'
    }
  }
};
