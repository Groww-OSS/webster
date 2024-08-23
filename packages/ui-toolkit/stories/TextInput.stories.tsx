import React, { useRef } from 'react';

import { StoryFn } from '@storybook/react';

import { Cancel } from '@groww-tech/icon-store/mi';
import TextInput, { TextInputProps } from '../src/components/atoms/TextInputV1/TextInputV1';

export default {
  title: 'TextInput',
  component: TextInput,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<TextInputProps> = (args) => {
  const [ value, setValue ] = React.useState('');
  const ref = useRef<HTMLInputElement>(null);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <TextInput {...args}
    ref={ref}
    value={value}
    onChange={onChange}
  />;
};

export const Primary = {
  render: Template,

  args: {
    label: 'Email',
    placeholder: 'Enter Email',
    variant: 'default'
  }
};

export const Disabled = {
  render: Template,

  args: {
    label: 'Email',
    placeholder: 'Enter Email',
    disabled: true
  }
};

export const Error = {
  render: Template,

  args: {
    label: 'Email',
    error: 'There\'s an error',
    value: 'type something',
    placeholder: 'Enter Email'
  }
};

export const Exclusive = {
  render: Template,

  args: {
    label: 'Email',
    placeholder: 'Enter Email',
    variant: 'exclusive'
  }
};

export const ExclusiveDisabled = {
  render: Template,

  args: {
    label: 'Email',
    placeholder: 'Email',
    variant: 'exclusive',
    disabled: true
  }
};

export const ExclusiveError = {
  render: Template,

  args: {
    label: 'Email',
    error: 'There\'s an error',
    value: 'type something',
    variant: 'exclusive'
  }
};

export const Password = {
  render: Template,

  args: {
    label: 'Password',
    placeholder: 'Enter Password',
    type: 'password'
  }
};

export const Clearable = {
  render: Template,

  args: {
    label: 'Email',
    clearable: true
  }
};

export const Small = {
  render: Template,

  args: {
    label: 'Email',
    placeholder: 'Enter Email',
    size: 'small'
  }
};

export const Large = {
  render: Template,

  args: {
    label: 'Email',
    placeholder: 'Enter Email',
    size: 'large'
  }
};

export const NoLabel = Template.bind({
  label: '',
  placeholder: 'No Label'
});

export const CustomLabel = {
  render: Template,

  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          className="contentSecondary bodyLarge"
          style={{ marginBottom: '8px' }}
        >
          Shares to buy NSE
        </div>
        <Story />
        <div style={{ marginBottom: '8px' }}>Shares to buy NSE</div>
      </div>
    )
  ],

  args: {
    label: '',
    placeholder: 'Enter Email',
    SuffixComponent: () => (
      <>
        {' '}
        <Cancel size={18} />
      </>
    )
  }
};

export const EditPhoneNumber = {
  render: Template,

  args: {
    PrefixComponent: () => <span className="bodyLarge">+91 </span>,
    placeholder: '+91',
    variant: 'exclusive'
  }
};

export const EditPhoneNumberExclusive = {
  render: Template
};

export const Unstyled = {
  render: Template,

  args: {
    placeholder: 'Enter Email',
    variant: 'unstyled'
  }
};

export const UnstyledLarge = {
  render: Template,

  args: {
    placeholder: 'Enter Email',
    variant: 'unstyled',
    size: 'large'
  }
};

export const UnstyledLargeRupeeSymbol = {
  render: Template,

  args: {
    placeholder: 'Enter Email',
    variant: 'unstyled',
    size: 'large',
    PrefixComponent: () => <div className="headingLarge">₹ </div>
  }
};
