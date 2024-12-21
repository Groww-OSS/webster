import type {
  ExternalToast,
  ToastT,
  ToastToDismiss,
  ToastTypes
} from './types';

let toastsCounter = 1;

class Observer {
  subscribers: Array<(toast: ExternalToast | ToastToDismiss) => void>;


  toasts: Array<ToastT | ToastToDismiss>;


  constructor() {
    this.subscribers = [];
    this.toasts = [];
  }

  // We use arrow functions to maintain the correct `this` reference
  subscribe = (subscriber: (toast: ExternalToast | ToastToDismiss) => void) => {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);

      this.subscribers.splice(index, 1);
    };
  };


  publish = (data: ToastT) => {
    this.subscribers.forEach((subscriber) => subscriber(data));
  };


  addToast = (data: ToastT) => {
    this.publish(data);
    this.toasts = [ ...this.toasts, data ];
  };


  create = (
    data: ExternalToast & {
      type?: ToastTypes;
    }
  ) => {
    const id = typeof data?.id === 'number' || (data?.id?.length ?? 0) > 0 ? data.id : toastsCounter++;
    const alreadyExists = this.toasts.find((toast) => {
      return toast.id === id;
    });
    const dismissible = data.dismissible === undefined ? true : data.dismissible;

    if (alreadyExists) {
      this.toasts = this.toasts.map((toast) => {
        if (toast.id === id) {
          this.publish({ ...toast, ...data, id });
          return {
            ...toast,
            ...data,
            id,
            dismissible
          };
        }

        return toast;
      });

    } else {
      this.addToast({
        ...data,
        dismissible,
        id: id || '',
        position: data.position || 'top-right'
      });
    }

    return id;
  };


  dismiss = (id?: number | string) => {
    if (!id) {
      this.toasts.forEach((toast) => {
        this.subscribers.forEach((subscriber) => subscriber({ id: toast.id, dismiss: true }));
      });
    }

    this.subscribers.forEach((subscriber) => subscriber({ id, dismiss: true }));
    return id;
  };


  error = (data?: ExternalToast) => {
    return this.create({ ...data, type: 'error' });
  };


  success = (data?: ExternalToast) => {
    return this.create({ ...data, type: 'success' });
  };


  info = (data?: ExternalToast) => {
    return this.create({ ...data, type: 'info' });
  };


  warning = (data?: ExternalToast) => {
    return this.create({ ...data, type: 'warning' });
  };


  custom = (data?: ExternalToast) => {
    const id = data?.id || toastsCounter++;

    this.create({ id, ...data });
    return id;
  };
}

export const ToastState = new Observer();

// bind this to the toast function
const toastFunction = (data?: ExternalToast) => {
  const id = data?.id || toastsCounter++;

  ToastState.addToast({
    ...data,
    id
  });
  return id;
};

const basicToast = toastFunction;


const getHistory = () => ToastState.toasts;

// We use `Object.assign` to maintain the correct types as we would lose them otherwise
export const toast = Object.assign(
  basicToast,
  {
    success: ToastState.success,
    info: ToastState.info,
    warning: ToastState.warning,
    error: ToastState.error,
    custom: ToastState.custom
  },
  { getHistory }
);
