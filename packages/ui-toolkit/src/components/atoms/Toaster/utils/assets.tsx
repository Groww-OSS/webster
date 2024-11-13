import React from 'react';

import {
  MdsIcCheckCircleSelected,
  MdsIcError,
  MdsIcInfo,
  MdsIcCancelCircle
} from '@groww-tech/icon-store/mint-icons';

import { ToastTypes } from '../types';

export const getAsset = (type: ToastTypes): JSX.Element | null => {
  switch (type) {
    case 'success':
      return <MdsIcCheckCircleSelected size={22} />;

    case 'info':
      return <MdsIcInfo size={22} />;

    case 'warning':
      return <MdsIcError size={22} />;

    case 'error':
      return <MdsIcCancelCircle size={22} />;

    case 'default':

    default:
      return null;
  }
};
