import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './styles/index.css';
import {
  MdsIcCancelCircle,
  MdsIcError,
  MdsIcShowEye,
  MdsIcHideEye
} from '@groww-tech/icon-store/mint-icons';
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
  prefixIcon?: ReactIconComponentType;
  suffixIcon?: ReactIconComponentType;
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
  prefixIcon,
  suffixIconButton,
  suffixIcon,
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
  onEnterPress
}) => {
  const [ showClearIcon, setShowClearIcon ] = useState(false);
  const [ isFocused, setIsFocused ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);

  useEffect(() => {
    setShowClearIcon(!!clearable && value.length > 0);
  }, [ clearable, value ]);

  const inputClasses = cn('input');

  const inputWrapperClasses = cn('inputWrapper');


  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (variant === 'number') {
      e.currentTarget.blur();
    }
  };

  const inputContentClasses = cn('inputContent backgroundPrimary contentPrimary borderPrimary', {
    'inputBorderNegative': error.hasError,
    'inputClearable': clearable,
    'inputPrefix': prefixIcon || prefixLabel,
    'inputSuffix': suffixIcon || (clearable && showClearIcon) || variant === 'password',
    'inputFocused': isFocused && !disabled && !error.hasError,
    'backgroundSecondary borderPrimary contentSecondary': disabled
  });


  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(event);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) onKeyDown(e);
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress(e);
    }
  };

  return (
    <div className={inputWrapperClasses}
      style={{ width: width }}
    >
      {label && <div className='bodySmallHeavy contentSecondary'>{label}</div>}
      <div className={`${inputContentClasses}`}>
        {
          (prefixIcon || prefixLabel) && (
            <div className='prefixContainer'>
              {prefixIcon && <div className='inputPrefixIcon'>{prefixIcon}</div>}
              {prefixLabel && <div className={`inputPrefixLabel ${perfixTextColor} ${prefixTextStyle}`}>{prefixLabel}</div>}
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
          data-testid={dataTestId}
          maxLength={maxLength}
          ref={ref}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          autoComplete={autoComplete}
          onKeyUp={onKeyUp}
        />
        {
          (clearable && showClearIcon) || variant === 'password' || suffixIcon || suffixIconButton ? (
            <div className='suffixContainer'>
              {
                clearable && showClearIcon && (
                  <div className='inputClearIcon'
                    onClick={handleClear}
                  >
                    <MdsIcCancelCircle />
                  </div>
                )
              }
              {
                variant === 'password' && (
                  <div className='inputSuffixIcon'
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <MdsIcHideEye /> : <MdsIcShowEye />}
                  </div>
                )
              }
              {suffixIcon && <div className='inputSuffixIcon'>{suffixIcon}</div>}
              {
                suffixIconButton && (
                  <div className='inputSuffixIcon'>
                    <IconButtonV2 onClick={suffixIconButton.onClick}
                      Icon={suffixIconButton.icon}
                    />
                  </div>
                )
              }
            </div>
          ) : null
        }
      </div>
      {helperText && <div className='contentSecondary bodySmall'>{helperText}</div>}
      {
        error.hasError && error.message && (
          <div className='contentNegative inputErrorText bodySmall'>
            <MdsIcError />
            {error.message}
          </div>
        )
      }
    </div>
  );
};

export default FreeFormInput;
