import React from 'react';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Carousel } from '../src/components/molecules';
import { Settings } from '../src/types/components/molecules/Carousel/index';

export default {
  title: 'Carousel',
  component: Carousel,
  tags: [ 'autodocs' ],
  argTypes: {
    lazyLoad: {
      type: 'select',
      options: [ 'ondemand', 'progressive' ]
    }
  }
};


const Template: StoryFn<Settings> = (args) => (
  <Carousel {...args}>
    <span style={{ marginRight: '87px' }}>React</span>
    <span style={{ marginRight: '87px' }}>Hello</span>
    <span style={{ marginRight: '87px' }}>Hello</span>
    <span style={{ marginRight: '87px' }}>Hello</span>
  </Carousel>
);

export const OneSlide = {
  render: Template,

  args: {
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    arrows: false,
    swipeToSlide: true,
    infinite: false,
    initialSlide: 0
  }
};

export const Doted = {
  render: Template,

  args: {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    arrows: true,
    swipeToSlide: true,
    infinite: false,
    initialSlide: 0
  }
};
