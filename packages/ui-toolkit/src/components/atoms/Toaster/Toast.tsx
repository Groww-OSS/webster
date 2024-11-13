import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  isValidElement,
  CSSProperties
} from 'react';

import { MdsIcCloseCross as CloseIcon } from '@groww-tech/icon-store/mint-icons';

import { getAsset } from './utils/assets';
import { useIsDocumentHidden } from './utils/hooks';
import { HeightT, ToastProps } from './types';

import './styles.css';

// Default lifetime of a toasts (in ms)
const TOAST_LIFETIME = 5000;

// Equal to exit animation duration
const TIME_BEFORE_UNMOUNT = 50;

// Default gap between toasts
const GAP = 14;


const Toast = (props: ToastProps) => {
  const {
    toast,
    interacting,
    setHeights,
    visibleToasts,
    heights,
    index,
    toasts,
    expanded,
    removeToast,
    position,
    gap = GAP,
    expandByDefault,
    pauseWhenPageIsHidden
  } = props;
  const [ mounted, setMounted ] = useState(false);
  const [ removed, setRemoved ] = useState(false);
  const [ offsetBeforeRemove, setOffsetBeforeRemove ] = useState(0);
  const [ initialHeight, setInitialHeight ] = useState(0);
  const toastRef = useRef<HTMLLIElement>(null);
  const isFront = index === 0;
  const isVisible = index + 1 <= visibleToasts;
  const toastType = toast.type || 'default';
  const dismissible = toast.dismissible !== false;
  // Height index is used to calculate the offset as it gets updated before the toast array, which means we can calculate the new layout faster.
  const heightIndex = useMemo(
    () => heights.findIndex((height) => height.toastId === toast.id) || 0,
    [ heights, toast.id ]
  );
  const showCloseButton = toast.closeButton ?? true; // Default to true
  const duration = toast.duration || TOAST_LIFETIME;
  const closeTimerStartTimeRef = useRef(0);
  const offset = useRef(0);
  const lastCloseTimerStartTimeRef = useRef(0);
  const [ y, x ] = position.split('-');
  const toastsHeightBefore = useMemo(() => {
    return heights.reduce((prev, curr, reducerIndex) => {
      // Calculate offset up until current  toast
      if (reducerIndex >= heightIndex) {
        return prev;
      }

      return prev + curr.height;
    }, 0);
  }, [ heights, heightIndex ]);
  const isDocumentHidden = useIsDocumentHidden();

  offset.current = useMemo(() => heightIndex * gap + toastsHeightBefore, [ heightIndex, toastsHeightBefore ]);


  useEffect(() => {
    // Trigger enter animation without using CSS animation
    setMounted(true);
  }, []);


  useLayoutEffect(() => {
    if (!mounted) return;
    const toastNode = toastRef.current;

    if (!toastNode) return;

    const originalHeight = toastNode.style.height;

    toastNode.style.height = 'auto';
    const newHeight = toastNode.getBoundingClientRect().height;

    toastNode.style.height = originalHeight;

    setInitialHeight(newHeight);

    setHeights((heights: HeightT[]) => {
      const alreadyExists = heights.find((height) => height.toastId === toast.id);

      if (!alreadyExists) {
        return [ { toastId: toast.id, height: newHeight, position: toast.position }, ...heights ];

      } else {
        return heights.map((height) => (height.toastId === toast.id ? { ...height, height: newHeight } : height));
      }
    });
  }, [ mounted, toast.title, toast.description, setHeights, toast.id ]);


  const deleteToast = useCallback(() => {
    // Save the offset for the exit swipe animation
    setRemoved(true);
    setOffsetBeforeRemove(offset.current);
    setHeights((h: HeightT[]) => h.filter((height) => height.toastId !== toast.id));

    setTimeout(() => {
      removeToast(toast);
    }, TIME_BEFORE_UNMOUNT);
  }, [ toast, removeToast, setHeights, offset ]);


  useEffect(() => {
    if (toast.duration === Infinity) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    let remainingTime = duration;

    // Pause the timer on each hover
    const pauseTimer = () => {
      if (lastCloseTimerStartTimeRef.current < closeTimerStartTimeRef.current) {
        // Get the elapsed time since the timer started
        const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.current;

        remainingTime = remainingTime - elapsedTime;
      }

      lastCloseTimerStartTimeRef.current = new Date().getTime();
    };


    const startTimer = () => {
      // setTimeout(, Infinity) behaves as if the delay is 0.
      // As a result, the toast would be closed immediately, giving the appearance that it was never rendered.
      // See: https://github.com/denysdovhan/wtfjs?tab=readme-ov-file#an-infinite-timeout
      if (remainingTime === Infinity) return;

      closeTimerStartTimeRef.current = new Date().getTime();

      // Let the toast know it has started
      timeoutId = setTimeout(() => {
        toast.onAutoClose?.(toast);
        deleteToast();
      }, remainingTime);
    };

    if (expanded || interacting || (pauseWhenPageIsHidden && isDocumentHidden)) {
      pauseTimer();

    } else {
      startTimer();
    }

    return () => clearTimeout(timeoutId);
  }, [
    expanded,
    interacting,
    expandByDefault,
    toast,
    duration,
    deleteToast,
    toastType,
    pauseWhenPageIsHidden,
    isDocumentHidden
  ]);


  useEffect(() => {
    const toastNode = toastRef.current;

    if (toastNode) {
      const height = toastNode.getBoundingClientRect().height;

      // Add toast height tot heights array after the toast is mounted
      setInitialHeight(height);
      setHeights((h: HeightT[]) => [ { toastId: toast.id, height, position: toast.position }, ...h ]);

      return () => setHeights((h: HeightT[]) => h.filter((height) => height.toastId !== toast.id));
    }
  }, [ setHeights, toast.id ]);

  useEffect(() => {
    if (toast.delete) {
      deleteToast();
    }
  }, [ deleteToast, toast.delete ]);


  return (
    <li
      aria-live={toast.important ? 'assertive' : 'polite'}
      aria-atomic="true"
      role="status"
      tabIndex={0}
      ref={toastRef}
      className='borderPrimary backgroundPrimary'
      data-sonner-toast=""
      data-styled={!Boolean(toast.jsx)}
      data-mounted={mounted}
      data-removed={removed}
      data-visible={isVisible}
      data-y-position={y}
      data-x-position={x}
      data-index={index}
      data-front={isFront}
      data-dismissible={dismissible}
      data-type={toastType}
      data-expanded={Boolean(expanded || (expandByDefault && mounted))}
      style={
        {
          '--index': index,
          '--toasts-before': index,
          '--z-index': toasts.length - index,
          '--offset': `${removed ? offsetBeforeRemove : offset.current}px`,
          '--initial-height': expandByDefault ? 'auto' : `${initialHeight}px`
        } as CSSProperties
      }
    >
      {
        showCloseButton && !toast.jsx ? (
          <button
            aria-label="Close toast"
            data-close-button
            onClick={
              !dismissible
                ? () => {}
                : () => {
                  deleteToast();
                  toast.onDismiss?.(toast);
                }
            }
            className='borderPrimary contentPrimary'
          >
            <CloseIcon size={12} />
          </button>
        ) : null
      }
      {
        toast.jsx || isValidElement(toast.title) ? (
          toast.jsx || toast.title
        ) : (
          <>
            {
              toastType ? (
                <div
                  data-icon={toastType}
                  className={toastType}
                >
                  { getAsset(toastType) }
                </div>
              ) : null
            }

            <div data-content="">
              {toast.title ? <div className=' bodyLargeHeavy'>{toast.title}</div> : null}
              {
                toast.description ? <div className='bodyBase'>{toast.description}</div> : null
              }
            </div>
          </>
        )
      }
    </li>
  );
};


export default Toast;
