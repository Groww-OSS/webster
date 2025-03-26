import React, {
  useState,
  useEffect,
  forwardRef,
  useCallback,
  memo
} from 'react';
import cn from 'classnames';
import {
  MdsIcCancelCircle,
  MdsIcError,
  MdsIcShowEye,
  MdsIcHideEye
} from '@groww-tech/icon-store/mint-icons';
import TempIconButtonV2 from '../TempIconButtonV2/TempIconButtonV2';
import type { ReactIconComponentType } from '@groww-tech/icon-store';
import { ContentMintTokens } from '../../../types/mint-token-types/content-mint-tokens';
import './styles/index.css';


type PrefixSectionProps = {
  PrefixIcon?: ReactIconComponentType;
  prefixLabel?: string;
  prefixIconColor: ContentMintTokens;
  prefixTextColor: ContentMintTokens;
  prefixTextStyle: 'bodyBase' | 'bodyBaseHeavy';
  dataTestId?: string;
};

const PrefixSection = memo<PrefixSectionProps>(({
  PrefixIcon,
  prefixLabel,
  prefixIconColor,
  prefixTextColor,
  prefixTextStyle,
  dataTestId
}) => {
  if (!PrefixIcon && !prefixLabel) return null;

  return (
    <div className="freeform-prefixContainer"
      data-test-id={`${dataTestId}-prefix-container`}
    >
      {
        PrefixIcon && (
          <div className={`freeform-inputPrefixIcon ${prefixIconColor}`}
            data-test-id={`${dataTestId}-prefix-icon`}
          >
            <PrefixIcon size={20}/>
          </div>
        )
      }
      {
        prefixLabel && (
          <div
            className={`freeform-inputPrefixLabel ${prefixTextColor} ${prefixTextStyle}`}
            data-test-id={`${dataTestId}-prefix-label`}
          >
            {prefixLabel}
          </div>
        )
      }
    </div>
  );
});


type SuffixSectionProps = {
  clearable: boolean;
  showClearIcon: boolean;
  variant: 'text' | 'password' | 'number';
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  SuffixIcon?: ReactIconComponentType;
  suffixIconButton?: SuffixIconButtonProps;
  handleClear: () => void;
  clearIconColor: ContentMintTokens;
  passwordToggleIconColor: ContentMintTokens;
  suffixIconColor: ContentMintTokens;
  suffixIconButtonColor: ContentMintTokens;
  disabled?: boolean;
  dataTestId?: string;
};

const SuffixSection = memo<SuffixSectionProps>(({
  clearable,
  showClearIcon,
  variant,
  showPassword,
  setShowPassword,
  SuffixIcon,
  suffixIconButton,
  handleClear,
  clearIconColor,
  passwordToggleIconColor,
  suffixIconColor,
  suffixIconButtonColor,
  disabled,
  dataTestId
}) => {
  const showSuffixContainer = (clearable && showClearIcon) || variant === 'password' || !!SuffixIcon || !!suffixIconButton;

  if (!showSuffixContainer) return null;

  return (
    <div className="freeform-suffixContainer"
      data-test-id={`${dataTestId}-suffix-container`}
    >
      {
        clearable && showClearIcon && (
          <div className="freeform-inputClearIcon"
            data-test-id={`${dataTestId}-clear-icon`}
          >
            <TempIconButtonV2
              onClick={handleClear}
              Icon={MdsIcCancelCircle}
              size="medium"
              data-test-id={`${dataTestId}-clear-button`}
              iconColor={clearIconColor}
            />
          </div>
        )
      }

      {
        variant === 'password' && (
          <div className="freeform-inputSuffixIcon"
            data-test-id={`${dataTestId}-password-toggle`}
          >
            <TempIconButtonV2
              onClick={() => setShowPassword(!showPassword)}
              Icon={showPassword ? MdsIcHideEye : MdsIcShowEye}
              size="medium"
              data-test-id={`${dataTestId}-password-toggle-button`}
              iconColor={passwordToggleIconColor}
            />
          </div>
        )
      }

      {
        SuffixIcon && (
          <div className={`freeform-inputSuffixIcon ${suffixIconColor}`}
            data-test-id={`${dataTestId}-suffix-icon`}
          >
            <SuffixIcon size={20}/>
          </div>
        )
      }

      {
        suffixIconButton && (
          <div className="freeform-inputSuffixIcon"
            data-test-id={`${dataTestId}-suffix-button`}
          >
            <TempIconButtonV2
              onClick={suffixIconButton.onClick}
              Icon={suffixIconButton.icon}
              disabled={disabled}
              size="medium"
              iconColor={suffixIconButtonColor}
            />
          </div>
        )
      }
    </div>
  );
});


type SuffixIconButtonProps = {
  icon: ReactIconComponentType;
  onClick: () => void;
};

export type FreeFormInputProps = {
  placeholder?: string;
  value: string;
  label?: string;
  labelColor?: ContentMintTokens;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  dataTestId?: string;
  width?: string;
  maxLength?: number;
  PrefixIcon?: ReactIconComponentType;
  SuffixIcon?: ReactIconComponentType;
  suffixIconButton?: SuffixIconButtonProps;
  prefixLabel?: string;
  error?: boolean;
  errorMessage?: string;
  clearable?: boolean;
  helperText?: string;
  helperTextColor?: ContentMintTokens;
  variant?: 'text' | 'password' | 'number';
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  prefixTextColor?: ContentMintTokens;
  prefixTextStyle?: 'bodyBase' | 'bodyBaseHeavy';
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disableCopyPaste?: boolean;
  disableDecimal?: boolean;
  prefixIconColor?: ContentMintTokens;
  suffixIconColor?: ContentMintTokens;
  suffixIconButtonColor?: ContentMintTokens;
  clearIconColor?: ContentMintTokens;
  passwordToggleIconColor?: ContentMintTokens;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const FreeFormInput = forwardRef<HTMLInputElement, FreeFormInputProps>(({
  placeholder,
  value,
  label,
  labelColor = 'contentSecondary',
  onChange,
  disabled,
  dataTestId,
  width = '128px',
  maxLength,
  PrefixIcon,
  suffixIconButton,
  SuffixIcon,
  prefixLabel,
  error = false,
  errorMessage = '',
  clearable = false,
  helperText,
  helperTextColor = 'contentSecondary',
  variant = 'text',
  onKeyDown,
  autoComplete,
  onKeyUp,
  prefixTextColor = 'contentSecondary',
  prefixTextStyle = 'bodyBase',
  onEnterPress,
  disableCopyPaste = false,
  disableDecimal = false,
  prefixIconColor = 'contentSecondary',
  suffixIconColor = 'contentSecondary',
  suffixIconButtonColor = 'contentSecondary',
  clearIconColor = 'contentSecondary',
  passwordToggleIconColor = 'contentSecondary',
  onFocus,
  onBlur
}, ref) => {
  const [ showClearIcon, setShowClearIcon ] = useState(false);
  const [ isFocused, setIsFocused ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);

  // Update clear icon visibility when value changes
  useEffect(() => {
    setShowClearIcon(clearable && value.length > 0);
  }, [ clearable, value ]);

  // Memoize class computation to prevent recalculation on every render
  const inputContentClasses = React.useMemo(() => cn('freeform-inputContent contentPrimary borderPrimary', {
    'backgroundPrimary': !disabled,
    'freeform-inputBorderNegative': error,
    'freeform-inputClearable': clearable,
    'freeform-inputPrefix': PrefixIcon || prefixLabel,
    'freeform-inputSuffix': SuffixIcon || (clearable && showClearIcon) || variant === 'password',
    'freeform-inputFocused': isFocused && !disabled && !error,
    'backgroundSecondary contentSecondary': disabled
  }), [ disabled, error, clearable, PrefixIcon, prefixLabel, SuffixIcon, showClearIcon, variant, isFocused ]);

  const handleClear = useCallback(() => {
    if (onChange) {
      const event = {
        target: { value: '' },
        currentTarget: { value: '' },
        preventDefault: () => {},
        stopPropagation: () => {}
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onChange(event);
    }
  }, [ onChange ]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);

    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress(e);
    }

    // Only block decimal point when disableDecimal is true
    if (disableDecimal && e.key === '.') {
      e.preventDefault();
      return;
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }

    // For number variant, only prevent non-numeric input with exceptions for navigation keys
    if (variant === 'number') {
      const allowedKeys = [ 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Home', 'End', '.' ];

      if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
  }, [ onKeyDown, onEnterPress, disableDecimal, variant ]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, [ onFocus ]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  }, [ onBlur ]);

  const handleCopyPaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disableCopyPaste) {
      e.preventDefault();
    }
  }, [ disableCopyPaste ]);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLInputElement>) => {
    if (variant === 'number') {
      e.currentTarget.blur();
    }
  }, [ variant ]);

  return (
    <div
      className="flex width100 freeform-inputWrapper"
      style={{ width }}
      data-test-id={`${dataTestId}-container`}
    >
      {
        label && (
          <div
            className={`bodySmallHeavy freeform-label ${labelColor}`}
            data-test-id={`${dataTestId}-label`}
          >
            {label}
          </div>
        )
      }

      <div className={inputContentClasses}
        data-test-id={`${dataTestId}-input-content`}
      >
        <PrefixSection
          PrefixIcon={PrefixIcon}
          prefixLabel={prefixLabel}
          prefixIconColor={prefixIconColor}
          prefixTextColor={prefixTextColor}
          prefixTextStyle={prefixTextStyle}
          dataTestId={dataTestId}
        />

        <input
          className="freeform-input bodyBase contentPrimary"
          type={variant === 'password' ? (showPassword ? 'text' : 'password') : variant}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          data-test-id={dataTestId}
          maxLength={maxLength}
          ref={ref}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          autoComplete={autoComplete}
          onKeyUp={onKeyUp}
          onCopy={handleCopyPaste}
          onCut={handleCopyPaste}
          onPaste={handleCopyPaste}
        />

        <SuffixSection
          clearable={clearable}
          showClearIcon={showClearIcon}
          variant={variant}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          SuffixIcon={SuffixIcon}
          suffixIconButton={suffixIconButton}
          handleClear={handleClear}
          clearIconColor={clearIconColor}
          passwordToggleIconColor={passwordToggleIconColor}
          suffixIconColor={suffixIconColor}
          suffixIconButtonColor={suffixIconButtonColor}
          disabled={disabled}
          dataTestId={dataTestId}
        />
      </div>

      {
        helperText && (
          <div
            className={`bodySmall ${helperTextColor} freeform-helperText`}
            data-test-id={`${dataTestId}-helper-text`}
          >
            {helperText}
          </div>
        )
      }

      {
        error && errorMessage && (
          <div
            className="contentNegative freeform-inputErrorText bodySmall"
            data-test-id={`${dataTestId}-error-message`}
          >
            <MdsIcError size={16}/>
            {errorMessage}
          </div>
        )
      }
    </div>
  );
});

export default memo(FreeFormInput);
