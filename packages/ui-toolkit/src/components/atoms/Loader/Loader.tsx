import React from 'react';
import cn from 'classnames';

import { LOADER_SIZE } from './loader.constants';

import './loader.css';

export const LOADER_TYPE = {
  CIRCULAR: 'circular',
  CIRCULAR_BOLT: 'circularBolt',
  CANDLE_STICK: 'candleStick',
  LINEAR: 'linear'
} as const;


export class Loader extends React.PureComponent<DefaultProps, {}> {
  static defaultProps: DefaultProps;


  render() {
    const {
      loaderType: type
    } = this.props;

    if (type === LOADER_TYPE.CIRCULAR_BOLT) {
      return this.getCirularBoltLoaderUI();
    }

    if (type === LOADER_TYPE.CANDLE_STICK) {
      return this.getCandleStickLoaderUI();
    }

    if (type === LOADER_TYPE.LINEAR) {
      return this.getLinearLoaderUI();
    }

    return this.getCircularLoaderUI();

  }


  getCircularLoaderUI = () => {
    const { borderWidth } = this.props;

    const containerClasses = this.getContainerClassName();
    const loaderClassNames = this.getLoaderClassName('loader14Circular');

    return (
      <div className={containerClasses}>
        <div className={loaderClassNames}
          style={{ borderWidth }}
        >
          <div></div>
        </div>
      </div>
    );
  }


  getCirularBoltLoaderUI = () => {
    const { borderWidth } = this.props;

    const containerClasses = this.getContainerClassName();
    const loaderClassNames = this.getLoaderClassName('loader14CircularBolt');

    return (
      <div className={containerClasses}>
        <div className={loaderClassNames}>
          <div style={{ borderWidth }}></div>
          <div></div>
        </div>
      </div>
    );
  }


  getCandleStickLoaderUI = () => {
    const containerClasses = this.getContainerClassName();
    const loaderClassNames = this.getLoaderClassName('loader14CandleStick');

    return (
      <div className={containerClasses}>
        <div className={loaderClassNames}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }


  getLinearLoaderUI = () => {
    const containerClasses = this.getContainerClassName('loader14Linear');

    return (
      <div className={containerClasses}>
        <div className="loader14Indeterminate" />
      </div>
    );
  }


  getContainerClassName = (defaultClass = '') => {
    const { active } = this.props;

    return cn({
      'loader14Active': active,
      'loader14Hidden': !active
    }, defaultClass);
  }


  getLoaderClassName = (defaultClass = '') => {
    const { dimension, loaderClassName } = this.props;

    return cn({
      [ `loader14${dimension}` ]: !!dimension
    }, [ 'loader14Inner', defaultClass, loaderClassName ]);
  }

}


Loader.defaultProps = {
  loaderType: 'circular',
  loaderClassName: '',
  active: true,
  dimension: 'BoltDefault',
  borderWidth: '2px'
};


export type DefaultProps = {
  loaderType: ValueOf<typeof LOADER_TYPE>;
  loaderClassName: string;
  active: boolean;
  dimension: ValueOf<typeof LOADER_SIZE>;
  borderWidth: string | number;
};

export default Loader;
