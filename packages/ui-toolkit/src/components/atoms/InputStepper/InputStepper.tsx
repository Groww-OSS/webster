import React, {
  useState,
  useEffect,
  forwardRef,
  useCallback,
  memo
} from 'react';
import cn from 'classnames';
import type { ReactIconComponentType } from '@groww-tech/icon-store';
import { MdsIcRemoveMinus, MdsIcAddPlus } from '@groww-tech/icon-store/mint-icons';
import TempIconButtonV2 from '../TempIconButtonV2/TempIconButtonV2';
import { ContentMintTokens } from '../../../types/mint-token-types/content-mint-tokens';
import { BackgroundMintTokens } from '../../../types/mint-token-types/background-mint-tokens';
import './styles/index.css';

    // Allow navigation/control keys
const allowedKeys = [ 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Home', 'End' ];

export type InputStepperProps = {
  placeholder?: string;
  value: number;
  onChange: (value: number) => void;
  dataTestId?: string;
  width?: string;
  error?: boolean;
  warning?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  typeable?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  textStyle?: 'bodyLarge' | 'bodyLargeHeavy';
  backgroundColor?: BackgroundMintTokens;
  textColor?: ContentMintTokens;
  shouldFocusOnMount?: boolean;
  disableCopyPaste?: boolean;
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disableDecimal?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

// Memoized stepper button component
const StepperButton = memo(({
  onClick,
  Icon,
  disabled,
  dataTestId
}: {
  onClick: () => void;
  Icon: ReactIconComponentType;
  disabled: boolean;
  dataTestId: string;
}) => (
  <div
    className="valign-wrapper"
    data-test-id={dataTestId}
  >
    <TempIconButtonV2
      onClick={onClick}
      Icon={Icon}
      disabled={disabled}
      size="small"
      dataTestId={`${dataTestId}-button`}
    />
  </div>
));

StepperButton.displayName = 'StepperButton';

const InputStepper = forwardRef<HTMLInputElement, InputStepperProps>(({
  placeholder,
  value,
  onChange,
  dataTestId,
  width = '128px',
  error = false,
  warning = false,
  disabled = false,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  typeable = true,
  onKeyDown,
  onKeyUp,
  textStyle = 'bodyLarge',
  backgroundColor = 'backgroundTransparent',
  textColor = 'contentPrimary',
  shouldFocusOnMount = false,
  disableCopyPaste = false,
  onEnterPress,
  disableDecimal = false,
  onFocus,
  onBlur
}, ref) => {
  const [ isFocused, setIsFocused ] = useState(false);
  const [ inputValue, setInputValue ] = useState(value.toString());

  // Update inputValue when value prop changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [ value ]);

  // Focus on mount if needed
  useEffect(() => {
    if (shouldFocusOnMount && ref && typeof ref !== 'function' && ref.current) {
      ref.current.focus();
    }
  }, [ shouldFocusOnMount, ref ]);

  // Memoized event handlers
  const handleWheel = useCallback((e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  }, []);

  const handleMinus = useCallback(() => {
    if (value > min && !disabled) {
      onChange(value - step);
    }
  }, [ value, min, disabled, onChange, step ]);

  const handlePlus = useCallback(() => {
    if (value < max && !disabled) {
      onChange(value + step);
    }
  }, [ value, max, disabled, onChange, step ]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!typeable) return;
    const newValue = e.target.value;

    if (newValue === '') {
      setInputValue('');
      onChange(min);

    } else {
      const numValue = Number(newValue);

      if (!isNaN(numValue) && numValue >= min && numValue <= max) {
        setInputValue(newValue);
        onChange(numValue);
      }
    }
  }, [ typeable, min, max, onChange ]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);

    if (inputValue === '') {
      setInputValue('0');
      onChange(0);

    } else if (inputValue.startsWith('0') && inputValue !== '0') {
      const numValue = Number(inputValue);

      setInputValue(numValue.toString());
      onChange(numValue);
    }

    onBlur?.(e);
  }, [ inputValue, onChange, onBlur ]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, [ onFocus ]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Only block decimal point when disableDecimal is true
    if (disableDecimal && e.key === '.') {
      e.preventDefault();
      return;
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }


    // Block keys that aren't digits, a period, or in the allowed keys list
    if (!/^[0-9]$/.test(e.key) && e.key !== '.' && !allowedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress(e);
    }

    onKeyDown?.(e);
  }, [ onEnterPress, disableDecimal, onKeyDown ]);

  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      if (value < max && !disabled) {
        onChange(value + step);
      }

    } else if (e.key === 'ArrowDown') {
      if (value > min && !disabled) {
        onChange(value - step);
      }
    }

    onKeyUp?.(e);
  }, [ value, max, min, disabled, onChange, step, onKeyUp ]);
  const handleCopyPaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disableCopyPaste) {
      e.preventDefault();
    }
  }, [ disableCopyPaste ]);

  // Memoized class names
  const inputClasses = cn('inputStepper-input width100 center-align', {
    contentDisabled: disabled
  });

  const inputContentClasses = cn(
    `inputStepper-inputContent pos-rel flex ${textStyle} ${textColor} borderPrimary`,
    {
      [backgroundColor]: !disabled,
      'inputStepper-inputBorderNegative': error,
      'inputStepper-inputBorderWarning': warning,
      'inputStepper-inputFocused': isFocused && !disabled && !error,
      'backgroundSecondary contentSecondary': disabled,
      contentDisabled: disabled
    }
  );

  return (
    <div
      className="inputStepper-inputWrapper"
      style={{ width }}
      data-test-id={`${dataTestId}-container`}
    >
      <div
        className={inputContentClasses}
        data-test-id={`${dataTestId}-content`}
      >
        <StepperButton
          onClick={handleMinus}
          Icon={MdsIcRemoveMinus}
          disabled={disabled || value <= min}
          dataTestId={`${dataTestId}-minus-container`}
        />

        <input
          className={`${inputClasses} ${backgroundColor} ${textStyle} ${textColor}`}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          data-test-id={dataTestId}
          ref={ref}
          onWheel={handleWheel}
          readOnly={!typeable}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onCopy={handleCopyPaste}
          onCut={handleCopyPaste}
          onPaste={handleCopyPaste}
        />

        <StepperButton
          onClick={handlePlus}
          Icon={MdsIcAddPlus}
          disabled={disabled || value >= max}
          dataTestId={`${dataTestId}-plus-container`}
        />
      </div>
    </div>
  );
});

export default memo(InputStepper);
