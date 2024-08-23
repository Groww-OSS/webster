import React from "react";

import { StoryFn } from "@storybook/react";

import { Loader } from "../src/components/atoms";
import {
  DefaultProps as LoaderProps,
  LOADER_TYPE,
} from "../src/components/atoms/Loader/Loader";

export default {
  title: "Loader",
  component: Loader,
  tags: [ 'autodocs' ]
};

export const Circular = {
  args: {
    loaderType: LOADER_TYPE.CIRCULAR,
    dimension: "SMALL",
  },
};

export const CircularBolt = {
  args: {
    loaderType: LOADER_TYPE.CIRCULAR_BOLT,
  },
};

export const CandleStick = {
  args: {
    loaderType: LOADER_TYPE.CANDLE_STICK,
  },
};

export const Linear = {
  args: {
    loaderType: LOADER_TYPE.LINEAR,
  },
};
