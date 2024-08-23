import React from 'react';

import { StoryFn } from '@storybook/react';

import { Ticker } from '../src/components/atoms';
import { Props as TickerProps } from '../src/components/atoms/Ticker/Ticker';

export default {
  title: 'Ticker',
  component: Ticker,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<TickerProps> = (args) => {
  const [ currentState, setCurrentState ] = React.useState({
    price: '₹74128.91',
    class: 'contentAccent'
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentState((prevState) => {
        if (prevState.price === '₹74128.91') {
          return {
            price: '₹56981.19',
            class: 'contentNegative'
          };

        } else {
          return {
            price: '₹74128.91',
            class: 'contentAccent'
          };
        }
      });
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="displaySmall">Wipro</div>
      <div className="valign-wrapper width100"
        style={{ columnGap: '20px' }}
      >
        <Ticker
          {...args}
          textClassName="displayBase"
          text={currentState.price}
          currentClassName="contentPrimary"
          hiddenClassName={currentState.class}
        />

        <span className="bodyBase">
          <span className={currentState.class}>
            {
              currentState.price === '₹56981.19'
                ? '-17147.72 (3.7%)'
                : '17147.72 (3.7%)'
            }
          </span>
          &nbsp;&nbsp;1D
        </span>
      </div>
    </>
  );
};

export const Default = {
  render: Template
};
