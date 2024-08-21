import React from "react";
import { StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Props as ScrollTopProps } from "../src/components/atoms/ScrollTop/ScrollTop";
import { ScrollTop } from "../src/components/atoms";
import { scrollTopDummyContent } from "../src/utils/content";

export default {
  title: "ScrollTop",
  component: ScrollTop,
  tags: [ 'autodocs' ]
};

const Template: StoryFn<ScrollTopProps> = (args) => {
  return (
    <>
      {scrollTopDummyContent()}
      <ScrollTop {...args} />
    </>
  );
};

export const Default = {
  render: Template,
};
