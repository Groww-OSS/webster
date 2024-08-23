import React from "react";

import { StoryFn } from "@storybook/react";

import { MessageBox } from "../src/components/atoms/MessageBox";
import { Props as MessageBoxProps } from "../src/components/atoms/MessageBox/MessageBox";

export default {
  title: "MessageBox",
  component: MessageBox,
  tags: [ 'autodocs' ],
  argTypes: {
    background: {
      control: {
        type: "select",
        options: ["Neutral", "Warning", "Error", "Positive"],
      },
    },
  },
};

export const Neutral = {
  args: {
    background: "Neutral",
    isCompact: false,
    content: `This is a informaton box. This can be used for anything,
     from a notice box to a notification box to anything you need it to be!!.
    Just kidding it\'s just a template text to fill up space. :P`,
  },
};

export const Warning = {
  args: {
    ...Neutral.args,
    background: "Warning",
  },
};

export const Error = {
  args: {
    ...Neutral.args,
    background: "Error",
  },
};

export const Positive = {
  args: {
    ...Neutral.args,
    background: "Positive",
    content:
      "This is the body that can span upto three lines. It can contain CTAs in the form of inline links",
  },
};

export const WithoutIcon = {
  args: {
    ...Neutral.args,
    background: "Neutral",
    isIconPresent: false,
  },
};
