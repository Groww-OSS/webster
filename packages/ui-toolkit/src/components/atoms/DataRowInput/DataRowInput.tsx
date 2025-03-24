import React, {
  useState,
  forwardRef,
  useCallback,
  memo
} from 'react';
import cn from 'classnames';
import type { ReactIconComponentType } from '@groww-tech/icon-store';
import { ContentMintTokens } from '../../../types/mint-token-types/content-mint-tokens';
import { BackgroundMintTokens } from '../../../types/mint-token-types/background-mint-tokens';
import { BorderMintTokens } from '../../../types/mint-token-types/border-mint-tokens';
import './styles/index.css';

export type DataRowInputProps = {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId?: string;
  width?: string;
  PrefixIcon?: ReactIconComponentType;
  prefixLabel?: string;
  disabled?: boolean;
  error?: boolean;
  warning?: boolean;
  min?: number;
  max?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disableDecimal?: boolean;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  textStyle?: 'bodyLarge' | 'bodyLargeHeavy';
  textColor?: ContentMintTokens;
  textAlign?: 'left-align' | 'right-align' | 'center-align';
  borderColor?: BorderMintTokens;
  perfixTextColor?: ContentMintTokens;
  prefixIconColor?: ContentMintTokens;
  backgroundColor?: BackgroundMintTokens;
  disableCopyPaste?: boolean;
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

// Memoized prefix component to prevent unnecessary re-renders
const PrefixComponent = memo(({
  PrefixIcon,
  prefixLabel,
  prefixIconColor,
  perfixTextColor,
  dataTestId
}: {
  PrefixIcon?: ReactIconComponentType;
  prefixLabel?: string;
  prefixIconColor: ContentMintTokens;
  perfixTextColor: ContentMintTokens;
  dataTestId?: string;
}) => (
  <div
    className="datarow-prefixContainer"
    data-test-id={`${dataTestId}-prefix-container`}
  >
    {
      PrefixIcon && (
        <div
          className={`datarow-inputPrefixIcon ${prefixIconColor}`}
          data-test-id={`${dataTestId}-prefix-icon`}
        >
          <PrefixIcon size={20}/>
        </div>
      )
    }
    {
      prefixLabel && (
        <div
          className={`datarow-inputPrefixLabel ${perfixTextColor}`}
          data-test-id={`${dataTestId}-prefix-label`}
        >
          {prefixLabel}
        </div>
      )
    }
  </div>
));

PrefixComponent.displayName = 'PrefixComponent';

const DataRowInput = forwardRef<HTMLInputElement, DataRowInputProps>(({
  placeholder,
  value,
  onChange,
  dataTestId,
  width = '128px',
  PrefixIcon,
  prefixLabel,
  disabled = false,
  error = false,
  warning = false,
  min,
  max,
  onKeyDown,
  disableDecimal = false,
  onKeyUp,
  textStyle = 'bodyLarge',
  textColor = 'contentPrimary',
  textAlign = 'right-align',
  perfixTextColor = 'contentSecondary',
  prefixIconColor = 'contentSecondary',
  backgroundColor = 'backgroundPrimary',
  borderColor = 'borderPrimary',
  disableCopyPaste = false,
  onEnterPress,
  onFocus,
  onBlur
}, ref) => {
  const [ isFocused, setIsFocused ] = useState(false);

  const hasPrefix = Boolean(PrefixIcon || prefixLabel);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleWheel = useCallback((e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Only block the period when disableDecimal is true
    if (disableDecimal && e.key === '.') {
      e.preventDefault();
      return;
    }

    // Allow navigation/control keys (backspace, delete, arrows, etc.)
    const allowedKeys = [ 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Home', 'End' ];

    // If it's not a digit, not a period, and not in the allowed keys list, block it
    if (!/^[0-9]$/.test(e.key) && e.key !== '.' && !allowedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress(e);
    }

    onKeyDown?.(e);
  }, [ disableDecimal, onEnterPress, onKeyDown ]);

  const handleCopyPaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disableCopyPaste) {
      e.preventDefault();
    }
  }, [ disableCopyPaste ]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, [ onFocus ]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  }, [ onBlur ]);

  // Memoize class names to avoid recalculation on each render
  const inputContentClasses = cn(
    `datarow-inputContent ${textColor} ${borderColor}`,
    {
      [backgroundColor]: !disabled,
      'datarow-inputBorderNegative': error,
      'datarow-inputBorderWarning': warning,
      'datarow-inputPrefix': hasPrefix,
      'datarow-inputFocused': isFocused && !disabled && !error,
      'backgroundSecondary contentSecondary': disabled
    }
  );

  const inputClasses = `datarow-input ${textAlign} ${textStyle} ${textColor} datarow-contentPrimary`;


  return (
    <div
      className="datarow-inputWrapper"
      style={{ width }}
      data-test-id={`${dataTestId}-container`}
    >
      <div
        className={inputContentClasses}
        data-test-id={`${dataTestId}-content`}
      >
        {
          hasPrefix && (
            <PrefixComponent
              PrefixIcon={PrefixIcon}
              prefixLabel={prefixLabel}
              prefixIconColor={prefixIconColor}
              perfixTextColor={perfixTextColor}
              dataTestId={dataTestId}
            />
          )
        }
        <input
          className={inputClasses}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          data-test-id={dataTestId}
          ref={ref}
          onWheel={handleWheel}
          min={min}
          max={max}
          onKeyDown={handleKeyDown}
          step={1}
          onKeyUp={onKeyUp}
          onCopy={handleCopyPaste}
          onCut={handleCopyPaste}
          onPaste={handleCopyPaste}
        />
      </div>
    </div>
  );
});

export default memo(DataRowInput);
