import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './styles/index.css';
import {
  MdsIcCancelCircle,
  MdsIcError,
  MdsIcShowEye,
  MdsIcHideEye
} from '@groww-tech/icon-store/mint-icons';
import TempIconButtonV2 from '../TempIconButtonV2/TempIconButtonV2';
import IconButtonV2 from '../IconButtonV2/IconButtonV2';
import { ReactIconComponentType } from '@groww-tech/icon-store/types.d';
import { ContentMintTokens } from '../../../types/mint-token-types/content-mint-tokens';


type SuffixIconButtonProps = {
  icon: ReactIconComponentType;
  onClick: () => void;
};

export type FreeFormInputProps = {
  placeholder?: string;
  value: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  dataTestId?: string;
  width?: string;
  maxLength?: number;
  PrefixIcon?: ReactIconComponentType;
  SuffixIcon?: ReactIconComponentType;
  suffixIconButton?: SuffixIconButtonProps;
  prefixLabel?: string;
  error?: { hasError: boolean; message: string };
  clearable?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  helperText?: string;
  variant?: 'text' | 'password' | 'number';
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  perfixTextColor?: ContentMintTokens;
  prefixTextStyle?: 'bodyBase' | 'bodyBaseHeavy';
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disableCopyPaste?: boolean;
  disableDecimal?: boolean;
};


const FreeFormInput: React.FC<FreeFormInputProps> = ({
  placeholder,
  value,
  label,
  onChange,
  disabled,
  dataTestId,
  width = '128px',
  maxLength,
  PrefixIcon,
  suffixIconButton,
  SuffixIcon,
  prefixLabel,
  error = { hasError: false, message: '' },
  clearable = false,
  ref,
  helperText,
  variant = 'text',
  onKeyDown,
  autoComplete,
  onKeyUp,
  perfixTextColor = 'contentSecondary',
  prefixTextStyle = 'bodyBase',
  onEnterPress,
  disableCopyPaste = false,
  disableDecimal = false
}) => {
  const [ showClearIcon, setShowClearIcon ] = useState(false);
  const [ isFocused, setIsFocused ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);

  useEffect(() => {
    setShowClearIcon(!!clearable && value.length > 0);
  }, [ clearable, value ]);

  const inputClasses = cn('freeform-input');
  const inputWrapperClasses = cn('freeform-inputWrapper');
  const inputContentClasses = cn('freeform-inputContent contentPrimary borderPrimary', {
    'backgroundPrimary': !disabled,
    'freeform-inputBorderNegative': error.hasError,
    'freeform-inputClearable': clearable,
    'freeform-inputPrefix': PrefixIcon || prefixLabel,
    'freeform-inputSuffix': SuffixIcon || (clearable && showClearIcon) || variant === 'password',
    'freeform-inputFocused': isFocused && !disabled && !error.hasError,
    'backgroundSecondary contentSecondary': disabled
  });


  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (variant === 'number') {
      e.currentTarget.blur();
    }
  };


  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: '' },
        currentTarget: { value: '' },
        preventDefault: () => {},
        stopPropagation: () => {}
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onChange(event);
    }
  };


  const handleCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disableCopyPaste) {
      e.preventDefault();
    }
  };


  const togglePasswordVisibility = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
    }

    setShowPassword(!showPassword);
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) onKeyDown(e);
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress(e);
    }

    if (disableDecimal && (e.key === '.')) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={inputWrapperClasses}
      style={{ width: width }}
      data-test-id={`${dataTestId}-container`}
    >
      {
        label && (
          <div
            className='bodySmallHeavy contentSecondary'
            data-test-id={`${dataTestId}-label`}
          >
            {label}
          </div>
        )
      }
      <div
        className={`${inputContentClasses}`}
        data-test-id={`${dataTestId}-input-content`}
      >
        {
          (PrefixIcon || prefixLabel) && (
            <div
              className='freeform-prefixContainer'
              data-test-id={`${dataTestId}-prefix-container`}
            >
              {
                PrefixIcon && (
                  <div
                    className='freeform-inputPrefixIcon'
                    data-test-id={`${dataTestId}-prefix-icon`}
                  >
                    <PrefixIcon size={20}/>
                  </div>
                )
              }
              {
                prefixLabel && (
                  <div
                    className={`freeform-inputPrefixLabel ${perfixTextColor} ${prefixTextStyle}`}
                    data-test-id={`${dataTestId}-prefix-label`}
                  >
                    {prefixLabel}
                  </div>
                )
              }
            </div>
          )
        }
        <input
          className={`${inputClasses} bodyBase contentPrimary`}
          type={
            variant === 'password'
              ? showPassword
                ? 'text'
                : 'password'
              : variant === 'number'
                ? 'number'
                : 'text'
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
        {
          (clearable && showClearIcon) || variant === 'password' || SuffixIcon || suffixIconButton ? (
            <div
              className='freeform-suffixContainer'
              data-test-id={`${dataTestId}-suffix-container`}
            >
              {
                clearable && showClearIcon && (
                  <div
                    className='freeform-inputClearIcon'
                    data-test-id={`${dataTestId}-clear-icon`}
                  >
                    <TempIconButtonV2
                      onClick={handleClear}
                      Icon={MdsIcCancelCircle}
                      size='medium'
                      data-test-id={`${dataTestId}-clear-button`}
                    />
                  </div>
                )
              }
              {
                variant === 'password' && (
                  <div
                    className='freeform-inputSuffixIcon'
                    data-test-id={`${dataTestId}-password-toggle`}
                  >
                    <TempIconButtonV2
                      onClick={togglePasswordVisibility}
                      Icon={showPassword ? MdsIcHideEye : MdsIcShowEye}
                      size='medium'
                      data-test-id={`${dataTestId}-password-toggle-button`}
                    />
                  </div>
                )
              }
              {
                SuffixIcon && (
                  <div
                    className='freeform-inputSuffixIcon'
                    data-test-id={`${dataTestId}-suffix-icon`}
                  >
                    <SuffixIcon size={20}/>
                  </div>
                )
              }
              {
                suffixIconButton && (
                  <div
                    className='freeform-inputSuffixIcon'
                    data-test-id={`${dataTestId}-suffix-button`}
                  >
                    <TempIconButtonV2
                      onClick={suffixIconButton.onClick}
                      Icon={suffixIconButton.icon}
                      disabled={disabled}
                      size='medium'
                    />
                  </div>
                )
              }
            </div>
          ) : null
        }
      </div>
      {
        helperText && (
          <div
            className='contentSecondary bodySmall'
            data-test-id={`${dataTestId}-helper-text`}
          >
            {helperText}
          </div>
        )
      }
      {
        error.hasError && error.message && (
          <div
            className='contentNegative freeform-inputErrorText bodySmall'
            data-test-id={`${dataTestId}-error-message`}
          >
            <MdsIcError size={16}/>
            {error.message}
          </div>
        )
      }
    </div>
  );
};

export default FreeFormInput;
