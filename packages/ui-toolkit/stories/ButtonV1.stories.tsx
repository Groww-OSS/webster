import React from 'react';

import { ChevronRight } from '@groww-tech/icon-store/mi';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import { ButtonV1 } from '../src/components/atoms/Button_V1';
import { Props as ButtonProps } from '../src/components/atoms/Button_V1/ButtonV1';

export default {
  title: 'ButtonV1',
  component: ButtonV1,
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
  <ButtonV1
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

export const Positive = Template.bind({});
Positive.args = {
  ...Primary.args,
  variant: 'Positive'
};

export const Negative = Template.bind({});
Negative.args = {
  ...Primary.args,
  variant: 'Negative'
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Primary.args,
  isDisabled: true
};

export const Loading = Template.bind({});
Loading.args = {
  ...Primary.args,
  isLoading: false
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
// Anchor
export const PrimaryLink = Template.bind({});
PrimaryLink.args = {
  buttonText: 'Link label',
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
  dataTestId: '',
  onClick: action('on Anchor Click'),
  href: 'https://groww.in',
  role: 'link'
};
export const SecondaryLink = Template.bind({});
SecondaryLink.args = {
  ...PrimaryLink.args,
  variant: 'Secondary'
};

export const TertiaryLink = Template.bind({});
TertiaryLink.args = {
  ...PrimaryLink.args,
  variant: 'Tertiary'
};

export const DisabledLink = Template.bind({});
DisabledLink.args = {
  ...PrimaryLink.args,
  isDisabled: true
};

export const LoadingLink = Template.bind({});
LoadingLink.args = {
  ...PrimaryLink.args,
  isLoading: true
};

export const FullWidthLink = Template.bind({});
FullWidthLink.args = {
  ...PrimaryLink.args,
  isFullWidth: true
};

export const WithLeadingIconLink = Template.bind({});
WithLeadingIconLink.args = {
  ...PrimaryLink.args,
  leadingIcon: (iconProps: any) => <ChevronRight {...iconProps} />,
};

export const WithTrailingIconLink = Template.bind({});
WithTrailingIconLink.args = {
  ...PrimaryLink.args,
  children: (<><p>Helloo</p></>),
  trailingIcon: (iconProps: any) => <ChevronRight {...iconProps} />
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  ...PrimaryLink.args,
  target: '_blank',
  isLoading: true,
  // children: (<><p>Helloo</p></>)
};

export const LeaveFeedback = Template.bind({});
LeaveFeedback.args = {
  ...PrimaryLink.args,
  target: '_blank',
  rel: 'nofollow noreferrer',
  buttonText: 'Leave a Feedback',
  variant: 'Secondary',
  isAccent: true
}
{/* <NextAnchorLink url={getTermsAndConditionsPageURL()}>
<p className={`${style.termsConditions} bodySmall`}>{AIKI_FOOTER.TERMS_CONDITIONS}</p>
</NextAnchorLink> */}
{/* <NextAnchorLink
isCsr={false}
url={BLOG_FEEDBACK}
target="_blank"
addAnchorClass='contentAccent'
rel='nofollow noreferrer'
>
<Button
  buttonText='LEAVE A FEEDBACK'
  onClick={() => { }}
  variant='Secondary'
  isAccent={true}
/>
</NextAnchorLink> */}