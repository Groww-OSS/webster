import React from "react";
import { StoryFn } from "@storybook/react";

import { Image } from "../src/components/atoms";
import { Props as ImageProps } from "../src/components/atoms/Image/Image";

export default {
  title: "Image",
  component: Image,
  tags: [ 'autodocs' ]
};

const Template: StoryFn<ImageProps> = (args) => {
  return (
    <div>
      <p>Random Image</p>
      <Image {...args} />
    </div>
  );
};

export const Icon = {
  render: Template,

  args: {
    src: "https://source.unsplash.com/random",
    alt: "random img",
    width: "400",
    height: 300,
    useLazyLoad: false,
  },
};
