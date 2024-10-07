import { ReactNode } from 'react';

export type ToastTypes = 'success' | 'info' | 'warning' | 'error' | 'default';
export interface ToastT {
  id: number | string;
  title?: string | ReactNode;
  type?: ToastTypes;
  jsx?: ReactNode;
  closeButton?: boolean;
  dismissible?: boolean;
  description?: ReactNode;
  duration?: number;
  delete?: boolean;
  important?: boolean;
  onDismiss?: (toast: ToastT) => void;
  onAutoClose?: (toast: ToastT) => void;
  position?: Position;
}

export type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export interface HeightT {
  height: number;
  toastId: number | string;
  position: Position;
}

export interface ToasterProps {
  position?: Position;
  hotkey?: string[];
  expand?: boolean;
  gap?: number;
  visibleToasts?: number;
  offset?: string | number;
  containerAriaLabel?: string;
  pauseWhenPageIsHidden?: boolean;
}

export interface ToastProps {
  toast: ToastT;
  toasts: ToastT[];
  index: number;
  expanded: boolean;
  heights: HeightT[];
  setHeights: any;
  removeToast: (toast: ToastT) => void;
  gap?: number;
  position: Position;
  visibleToasts: number;
  expandByDefault: boolean;
  interacting: boolean;
  pauseWhenPageIsHidden: boolean;
}

export interface ToastToDismiss {
  id: number | string;
  dismiss: boolean;
}

export type ExternalToast = Omit<ToastT, 'id' | 'type' | 'delete'> & {
  id?: number | string;
};
