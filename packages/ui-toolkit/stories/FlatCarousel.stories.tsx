import React from 'react';

import { StoryFn } from '@storybook/react';

import { FlatCarousel } from '../src/components/molecules';
import { Props as FlatCarouselProps } from '../src/components/molecules/FlatCarousel/FlatCarousel';

export default {
  title: 'FlatCarousel',
  component: FlatCarousel,
  tags: [ 'autodocs' ]
};

const carouselImages = [
  {
    // eslint-disable-next-line max-len
    src: 'https://images.unsplash.com/photo-1652534606221-9ea9adc8641c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NDA4NjI0OA&ixlib=rb-1.2.1&q=80&w=1080',
    darkSrc: '',
    alt: '1st Image',
    width: 400,
    height: 200,
    title: '1st Image',
    description: '1st Image',
    titleClass: 'bodyBase'
  },
  {
    // eslint-disable-next-line max-len
    src: 'https://images.unsplash.com/photo-1653478986501-61b22a3362ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NDA4NjMxNg&ixlib=rb-1.2.1&q=80&w=1080',
    darkSrc: '',
    alt: '2nd Image',
    width: 400,
    height: 200,
    title: '2nd Image',
    description: '2nd Image',
    titleClass: 'bodyBase'
  },
  {
    src: 'https://source.unsplash.com/random',
    darkSrc: '',
    alt: '3rd Image',
    width: 400,
    height: 200,
    title: '3rd Image',
    description: '3rd Image',
    titleClass: 'bodyBase'
  }
];

const slides: string[] = [ 'React', 'Hello Slide 2', 'Hello Silde 3' ];


const Template: StoryFn<FlatCarouselProps> = (args) => (
  <FlatCarousel {...args}>
    {
      slides.map((val, index) => {
        return (
          <span key={index}
            style={{ marginRight: '87px' }}
          >
            {val}
          </span>
        );
      })
    }
  </FlatCarousel>
);

export const Default = {
  render: Template,

  decorators: [
    (Story) => (
      <div style={{ marginTop: '350px' }}>
        <Story />
      </div>
    )
  ],

  args: {
    images: carouselImages
  }
};

export const Custom = {
  render: Template,

  args: {
    custom: true,
    images: carouselImages
  }
};
