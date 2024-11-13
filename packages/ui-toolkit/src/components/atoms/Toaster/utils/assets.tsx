import React from 'react';

import {
  CheckCircle,
  Error,
  Info,
  Cancel,
  Close
} from '@groww-tech/icon-store/mi';

import { ToastTypes } from '../types';

export const getAsset = (type: ToastTypes): JSX.Element | null => {
  switch (type) {
    case 'success':
      return <CheckCircle size={22} />;

    case 'info':
      return <Info size={22} />;

    case 'warning':
      return <Error size={22} />;

    case 'error':
      return <Cancel size={22} />;

    case 'default':

    default:
      return null;
  }
};

export const CloseIcon = () => <Close size={12} />;
