import React from 'react';

import { Add, ChevronRight } from '@groww-tech/icon-store/mi';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

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
  }
};


const Template: Story<ButtonProps> = (args) => (
  <Button
    {...args}
  />
);

export const Primary = Template.bind({});
Primary.args = {
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
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  variant: 'Secondary'
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  ...Primary.args,
  variant: 'Tertiary'
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Primary.args,
  isDisabled: true
};

export const Loading = Template.bind({});
Loading.args = {
  ...Primary.args,
  isLoading: true
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...Primary.args,
  isFullWidth: true
};

export const WithLeadingIcon = Template.bind({});
WithLeadingIcon.args = {
  ...Primary.args,
  leadingIcon: (iconProps: any) => <ChevronRight {...iconProps} />,
};

export const WithTrailingIcon = Template.bind({});
WithTrailingIcon.args = {
  ...Primary.args,
  trailingIcon: (iconProps: any) => <ChevronRight {...iconProps} />
};

export const LinkButtonPrimary = Template.bind({});
LinkButtonPrimary.args = {
  ...Primary.args,
  role: 'link',
  href: "https://groww.in",
  target: "_blank",
  onClick: action("Anchor type button clicked")
};

export const LinkButtonSecondary = Template.bind({});
LinkButtonSecondary.args = {
  ...Primary.args,
  variant: 'Secondary',
  role: 'link',
  href: "https://groww.in",
  target: "_blank",
  onClick: action("Anchor type button clicked")
};

export const LinkButtonTertiary = Template.bind({});
LinkButtonTertiary.args = {
  ...Primary.args,
  variant: 'Tertiary',
  role: 'link',
  href: "https://groww.in",
  target: "_blank",
  onClick: action("Anchor type button clicked")
};

export const LinkButtonLoading = Template.bind({});
LinkButtonLoading.args = {
  ...Primary.args,
  isLoading: true,
  role: 'link',
  href: "https://groww.in",
  target: "_blank",
  onClick: action("Anchor type button clicked")
};