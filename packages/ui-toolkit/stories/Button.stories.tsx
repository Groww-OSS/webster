import React from 'react';

import { ChevronRight } from '@groww-tech/icon-store/mi';
import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import { Button } from '../src/components/atoms/Button';
import { Props as ButtonProps } from '../src/components/atoms/Button/Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [ 'Primary', 'Secondary', 'Tertiary', 'Positive', 'Negative' ]
      }
    },
    size: {
      control: {
        type: 'select',
        options: [ 'Small', 'Base', 'Large' ]
      }
    }
  },
  tags: [ 'autodocs' ]
};


const Template: StoryFn<ButtonProps> = (args) => (
  <Button
    {...args}
  />
);

export const Primary = {
  render: Template,
  args: {
    buttonText: 'Button label',
    onClick: action('onButtonClick'),
    size: 'Base',
    variant: 'Primary',
    isLoading: false,
    isAccent: false,
    isCompact: false,
    isFixToBottom: false,
    isFullWidth: false,
    isDisabled: false,
    leadingIcon: null,
    trailingIcon: null,
    dataTestId: ''
  }
};

export const Secondary = {
  render: Template,
  args: {
    ...Primary.args,
    variant: 'Secondary'
  }
};

export const Tertiary = {
  render: Template,
  args: {
    ...Primary.args,
    variant: 'Tertiary'
  }
};

export const Disabled = {
  render: Template,
  args: {
    ...Primary.args,
    isDisabled: true
  }
};

export const Loading = {
  render: Template,
  args: {
    ...Primary.args,
    isLoading: true
  }
};

export const FullWidth = {
  render: Template,
  args: {
    ...Primary.args,
    isFullWidth: true
  }
};

export const WithLeadingIcon = {
  render: Template,
  args: {
    ...Primary.args,
    leadingIcon: (iconProps: any) => <ChevronRight {...iconProps} />
  }
};

export const WithTrailingIcon = {
  render: Template,
  args: {
    ...Primary.args,
    trailingIcon: (iconProps: any) => <ChevronRight {...iconProps} />
  }
};

export const LinkButtonPrimary = {
  render: Template,
  args: {
    ...Primary.args,
    role: 'link',
    href: 'https://groww.in',
    target: '_blank',
    rel: 'nofollow noopener noreferrer',
    onClick: action('Anchor type button clicked')
  }
};

export const LinkButtonSecondary = {
  render: Template,
  args: {
    ...Primary.args,
    variant: 'Secondary',
    role: 'link',
    href: 'https://groww.in',
    target: '_blank',
    onClick: action('Anchor type button clicked')
  }
};

export const LinkButtonTertiaryWithoutHref = {
  render: Template,
  args: {
    ...Primary.args,
    variant: 'Tertiary',
    role: 'link',
    target: '_blank',
    onClick: action('Anchor type button clicked')
  }
};

export const LinkButtonDisabled = {
  render: Template,
  args: {
    ...Primary.args,
    role: 'link',
    href: 'https://groww.in',
    target: '_blank',
    rel: 'nofollow noopener noreferrer',
    isDisabled: true,
    onClick: action('Anchor type button clicked')
  }
};

export const LinkButtonLoading = {
  render: Template,
  args: {
    ...Primary.args,
    isLoading: true,
    role: 'link',
    href: 'https://groww.in',
    target: '_blank',
    onClick: action('Anchor type button clicked')
  }
};

export const LinkButtonFullWidth = {
  render: Template,
  args: {
    ...Primary.args,
    role: 'link',
    href: 'https://groww.in',
    isFullWidth: true,
    onClick: action('Anchor type button clicked')
  }
};

export const LinkButtonWithLeadingIconAndInvalidHref = {
  render: Template,
  args: {
    ...Primary.args,
    role: 'link',
    href: 'javascript:void(0)',
    onClick: action('Anchor type button clicked'),
    leadingIcon: (iconProps: any) => <ChevronRight {...iconProps} />
  }
};

export const LinkButtonWithTrailingIconAndInvalidHref = {
  render: Template,
  args: {
    ...Primary.args,
    href: '#',
    role: 'link',
    onClick: action('Anchor type button clicked'),
    trailingIcon: (iconProps: any) => <ChevronRight {...iconProps} />
  }
};
