import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  CSSProperties
} from 'react';
import ReactDOM from 'react-dom';

import { ToastState } from './state';
import Toast from './Toast';
import {
  HeightT,
  ToasterProps,
  ToastT,
  ToastToDismiss,
  Position
} from './types';

import './styles.css';

// Visible no of toasts at a time in the viewport
const VISIBLE_TOASTS_AMOUNT = 251;

// Viewport padding
const VIEWPORT_OFFSET = '28px';

// Default toast width
const TOAST_WIDTH = 356;

// Default gap between toasts
const GAP = 14;


const Toaster = (props: ToasterProps) => {
  const {
    position = 'top-right',
    hotkey = [ 'altKey', 'KeyT' ],
    expand = false,
    offset,
    visibleToasts = VISIBLE_TOASTS_AMOUNT,
    gap = GAP,
    containerAriaLabel = 'Notifications',
    pauseWhenPageIsHidden = true
  } = props;
  const [ toasts, setToasts ] = useState<ToastT[]>([]);

  const possiblePositions: Position[] = useMemo(() => {
    const allToastPositions = toasts.filter(toast => toast.position !== undefined).map(toast => toast.position as Position);

    return Array.from(new Set([ ...allToastPositions ]));
  }, [ toasts, position ]);

  const [ heights, setHeights ] = useState<HeightT[]>([]);
  const [ expanded, setExpanded ] = useState(false);
  const [ interacting, setInteracting ] = useState(false);

  const listRef = useRef<HTMLOListElement>(null);
  const hotkeyLabel = hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');


  const removeToast = useCallback((toastToRemove: ToastT) => {
    setToasts((toasts: ToastT[]) => {
      if (!toasts.find((toast) => toast.id === toastToRemove.id)?.delete) {
        ToastState.dismiss(toastToRemove.id);
      }

      return toasts.filter(({ id }) => id !== toastToRemove.id);
    });
  }, []);


  useEffect(() => {
    return ToastState.subscribe((toast) => {
      if ((toast as ToastToDismiss).dismiss) {
        setToasts((toasts) => toasts.map((t) => (t.id === toast.id ? { ...t, delete: true } : t)));
        return;
      }

      // Prevent batching, temp solution.
      setTimeout(() => {
        ReactDOM.flushSync(() => {
          setToasts((toasts: any[]) => {
            const indexOfExistingToast = toasts.findIndex((t) => t.id === toast.id);

            // Update the toast if it already exists
            if (indexOfExistingToast !== -1) {
              return [
                ...toasts.slice(0, indexOfExistingToast),
                { ...toasts[indexOfExistingToast], ...toast },
                ...toasts.slice(indexOfExistingToast + 1)
              ];
            }

            return [ toast, ...toasts ];
          });
        });
      });
    });
  }, []);


  useEffect(() => {
    // Ensure expanded is always false when no toasts are present / only one left
    if (toasts.length <= 1) {
      setExpanded(false);
    }
  }, [ toasts ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isHotkeyPressed = hotkey.every((key) => (event as any)[key] || event.code === key);

      if (isHotkeyPressed) {
        setExpanded(true);
        listRef.current?.focus();
      }

      if (
        event.code === 'Escape' &&
        (document.activeElement === listRef.current || listRef.current?.contains(document.activeElement))
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [ hotkey ]);

  if (!toasts.length) return null;

  const topRightToastsHeightArray = Array.isArray(heights) ? heights.filter(toast => toast.position === 'top-right') : [];

  //sum of all toast height with position top right + gap
  let sumOfTopRightToastsHeight = topRightToastsHeightArray.reduce((a, b) => { return a + b.height; }, 0);

  sumOfTopRightToastsHeight = sumOfTopRightToastsHeight + (topRightToastsHeightArray.length - 1) * gap;
  sumOfTopRightToastsHeight = typeof sumOfTopRightToastsHeight === 'number' ? Math.ceil(sumOfTopRightToastsHeight) : sumOfTopRightToastsHeight;

  const expandedViewStyle: CSSProperties = expanded ? { height: `${sumOfTopRightToastsHeight}px`, overflow: 'scroll', backdropFilter: 'blur(4px)' } : {};


  const removeAllToasts = () => {
    ToastState.dismiss();
  };


  const clearAllButtonUI = (yPosition: string, xPosition: string) => {
    //close button handle only for top-right position
    const topRightToastsArray = toasts.filter(toast => toast.position === 'top-right');

    if (yPosition !== 'top' || xPosition !== 'right' || topRightToastsArray.length <= 1) return null;

    return (
      <div
        className='backgroundSecondary borderPrimary clear-all'
        data-toaster-clear-all
        onClick={removeAllToasts}
        data-y-position={yPosition}
        data-x-position={xPosition}
        onMouseEnter={() => setExpanded(true)}
        onMouseMove={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        style={
          {
            '--offset': VIEWPORT_OFFSET,
            '--width': `${TOAST_WIDTH}px`,
            zIndex: 99999999
          } as CSSProperties
        }
      >
        Clear all
      </div>
    );
  };

  return (
    // Remove item from normal navigation flow, only available via hotkey
    <section
      aria-label={`${containerAriaLabel} ${hotkeyLabel}`}
      tabIndex={-1}
    >
      {
        possiblePositions.map((position, index) => {
          const [ y, x ] = position.split('-');

          return (
            <>
              {clearAllButtonUI(y, x)}
              <ol
                key={position}
                tabIndex={-1}
                ref={listRef}
                data-sonner-toaster
                data-y-position={y}
                data-x-position={x}
                style={
                  {
                    '--front-toast-height': `${heights[0]?.height || 0}px`,
                    '--offset': typeof offset === 'number' ? `${offset}px` : offset || VIEWPORT_OFFSET,
                    '--width': `${TOAST_WIDTH}px`,
                    '--gap': `${gap}px`,
                    maxHeight: '95vh',
                    borderRadius: 8,
                    ...expandedViewStyle
                  } as CSSProperties
                }
                onMouseEnter={() => setExpanded(true)}
                onMouseMove={() => setExpanded(true)}
                onMouseLeave={
                  () => {
              // Avoid setting expanded to false when interacting with a toast, e.g. swiping
                    if (!interacting) {
                      setExpanded(false);
                    }
                  }
                }
                onPointerDown={
                  (event) => {
                    const isNotDismissible =
                event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false';

                    if (isNotDismissible) return;
                    setInteracting(true);
                  }
                }
                onPointerUp={() => setInteracting(false)}
              >
                {
                  toasts
                    .filter((toast) => (!toast.position && index === 0) || toast.position === position)
                    .map((toast, index) => (
                      <Toast
                        key={toast.id}
                        index={index}
                        toast={toast}
                        visibleToasts={expanded ? visibleToasts : 3}
                        interacting={interacting}
                        position={position}
                        removeToast={removeToast}
                        toasts={toasts.filter((t) => t.position === toast.position)}
                        heights={heights.filter((h) => h.position === toast.position)}
                        setHeights={setHeights}
                        expandByDefault={expand}
                        gap={gap}
                        expanded={expanded}
                        pauseWhenPageIsHidden={pauseWhenPageIsHidden}
                      />
                    ))
                }
              </ol>
            </>
          );
        })
      }
    </section>
  );
};

export default Toaster;
