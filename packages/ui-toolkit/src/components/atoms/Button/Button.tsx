import React, { useCallback } from 'react';
import cn from 'classnames';

import { ReactIconProps } from '@groww-tech/icon-store';

import {
  VARIANTS,
  BUTTON_SIZES,
  ROLE,
  DEFAULT_TABINDEX,
  KEYBOARD_EVENTS
} from './Button.constants';
import { Loader, LOADER_TYPE } from '../Loader';
import { ICON_POSITION } from '../../../utils/constants';

import './button.css';


const Button = (props: Props) => {
  const {
    size,
    buttonText,
    variant,
    isAccent,
    isCompact,
    isDisabled,
    leadingIcon,
    trailingIcon,
    isLoading,
    isFullWidth,
    dataTestId,
    isFixToBottom,
    role,
    href,
    type,
    rel,
    target,
    onClick,
    onKeyDown
  } = props;

  const primaryButtonClasses = cn(
    {
      contentOnColour: !isLoading && !isDisabled,
      backgroundAccent: !isDisabled || (isLoading && isDisabled)
    });

  const secondaryButtonClasses = cn({
    'mint-btn-secondary-no-accent': !isAccent,
    backgroundAccentSubtle: (isAccent && !isDisabled) || (isAccent && isDisabled && isLoading),
    'mint-btn-border-no-accent': !isAccent
  });

  const tertiaryButtonClasses = cn({
    'mint-btn-tertiary-accent': isAccent && !isDisabled && !isLoading,
    'mint-btn-tertiary-no-accent': !isAccent && !isDisabled,
    'mint-btn-tertiary-disabled': isDisabled && !isLoading
  });

  const postiveButtonClasses = cn({
    backgroundPositive: !isDisabled || (isLoading && isDisabled),
    contentOnColour: !isLoading && !isDisabled
  });

  const negativeButtonClasses = cn({
    backgroundNegative: !isDisabled || (isLoading && isDisabled),
    contentOnColour: !isLoading && !isDisabled
  });

  const fontClasses = cn({
    bodySmallHeavy: size === BUTTON_SIZES.SMALL,
    bodyBaseHeavy: size === BUTTON_SIZES.BASE,
    bodyLargeHeavy: size === BUTTON_SIZES.LARGE,
    contentDisabled: isDisabled,
    contentPrimary: !isAccent && !isDisabled,
    contentAccent: isAccent && !isDisabled
  });


  const baseClasses = cn('mint-btn-default absolute-center backgroundTransparent', fontClasses,
    {
      'cur-po': !isLoading && !isDisabled,
      'mint-btn-cursor-default': isLoading,
      'mint-btn-small': size === BUTTON_SIZES.SMALL,
      'mint-btn-medium': size === BUTTON_SIZES.BASE,
      'mint-btn-large': size === BUTTON_SIZES.LARGE,
      'mint-btn-full-width': isFullWidth,
      'mint-btn-loader': isLoading,
      'mint-btn-compact': variant === VARIANTS.TERTIARY && isCompact,
      'mint-btn-disabled': isDisabled && !isLoading
    });


  const loaderClasses = cn('mint-btn-loader-item', {
    'mint-btn-loader-primary': variant === VARIANTS.PRIMARY || variant === VARIANTS.POSITIVE || variant === VARIANTS.NEGATIVE,
    'mint-btn-loader-no-accent': (variant === VARIANTS.SECONDARY || variant === VARIANTS.TERTIARY) && !isAccent
  });

  const fixedToBottomClass = cn({
    'mint-btn-fixed-bottom': isFixToBottom,
    'mint-btn-border-no-accent': isFixToBottom,
    backgroundPrimary: isFixToBottom
  });

  const borderBottomClasses = cn({
    'mint-btn-tertiary-border': variant === VARIANTS.TERTIARY && !isAccent,
    borderNeutral: variant === VARIANTS.TERTIARY && !isDisabled && !isLoading && !isAccent,
    borderDisabled: variant === VARIANTS.TERTIARY && isDisabled && !isLoading && !isAccent
  });


  const getButtonClassesBasedOnVariant = () => {
    switch (variant) {
      case VARIANTS.PRIMARY:
        return cn(baseClasses, primaryButtonClasses);

      case VARIANTS.SECONDARY:
        return cn(baseClasses, secondaryButtonClasses);

      case VARIANTS.TERTIARY:
        return cn(baseClasses, tertiaryButtonClasses);

      case VARIANTS.POSITIVE:
        return cn(baseClasses, postiveButtonClasses);

      case VARIANTS.NEGATIVE:
        return cn(baseClasses, negativeButtonClasses);

      default:
        return cn(baseClasses, primaryButtonClasses);
    }
  };


  const getIconSize = () => {
    if (size === BUTTON_SIZES.SMALL) return 16;
    if (size === BUTTON_SIZES.BASE) return 20;
    if (size === BUTTON_SIZES.LARGE) return 24;
  };


  const getIconUI = (position: string) => {
    const buttonIconProps = {
      fill: 'currentColor',
      size: getIconSize()
    };

    if (position === ICON_POSITION.LEADING) return leadingIcon?.(buttonIconProps as ReactIconProps) || null;
    if (position === ICON_POSITION.TRAILING) return trailingIcon?.(buttonIconProps as ReactIconProps) || null;
  };


  const onButtonClick = (e: React.MouseEvent) => {
    if (isDisabled || isLoading) {
      e.stopPropagation();
      return;
    }

    onClick?.(e);
  };


  const onKeyDownHandler = useCallback((e: React.KeyboardEvent) => {
    // Prevent the default behavior of the key event.
    e.preventDefault();

    // Stop the event from propagating to parent elements. Since, onKeyDown event is propogated to parent elements.
    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
    e.stopPropagation();

    // Ignore the key event if the key is being held down and automatically repeating, or if the button is currently loading.
    if (e.repeat || isLoading) {
      return;
    }

    const wasAnyKeyPressed = Object.values(KEYBOARD_EVENTS).some(event =>
      (event === e.key.toLowerCase())
    );

    if (wasAnyKeyPressed) { onKeyDown?.(e); }
  }, [isLoading]);


  const getButtonElement = (Component: React.ElementType<ButtonProps | AnchorButtonProps>, props: any) => {
    return (
      <Component
        className={getButtonClassesBasedOnVariant()}
        data-test-id={dataTestId.length ? dataTestId : null}
        onClick={onButtonClick}
        tabIndex={DEFAULT_TABINDEX}
        onKeyDown={onKeyDownHandler}
        {...props}
      >
        {renderButtonContent()}
      </Component>
    );
  };


  const LinkButtonRender = () => {
    const linkProps = {
      href: isDisabled || isLoading ? undefined : href,
      role: ROLE.BUTTON,  // We are adding role as "button" since we are using <a/> as a button
      ...(rel && { rel }),
      ...(target && { target })
    };

    return getButtonElement('a', linkProps);
  };


  const DefaultButtonRender = () => {
    const buttonProps = { type: type ?? ROLE.BUTTON, disabled: isDisabled };

    return getButtonElement('button', buttonProps);
  };


  const renderButtonContent = () => (
    <>
      {
        isLoading && <div className="absolute-center mint-btn-loader-container">
          <Loader
            loaderType={LOADER_TYPE.CIRCULAR}
            loaderClassName={loaderClasses}
          />
        </div>
      }
      <>
        {leadingIcon && getIconUI(ICON_POSITION.LEADING)}

        <span className={borderBottomClasses}>
          {buttonText}
        </span>

        {trailingIcon && getIconUI(ICON_POSITION.TRAILING)}
      </>
    </>
  );


  const renderButton = () => {
    switch (role) {
      case ROLE.LINK:
        return LinkButtonRender();

      default:
        return DefaultButtonRender();
    }
  };

  return (
    isFixToBottom ? <div className={fixedToBottomClass}>{renderButton()}</div> : renderButton()
  );
};


type RequiredProps = {
  buttonText: string;
};


type OptionalProps = {
  onClick?: (e: React.MouseEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}


type DefaultProps = {
  size: ValueOf<typeof BUTTON_SIZES>;
  variant: ValueOf<typeof VARIANTS>;
  role: ValueOf<typeof ROLE>;
  isLoading: boolean;
  isAccent: boolean;
  isCompact: boolean;
  isFixToBottom: boolean;
  isFullWidth: boolean;
  isDisabled: boolean;
  leadingIcon: ((props: any) => JSX.Element) | null;
  trailingIcon: ((props: any) => JSX.Element) | null;
  dataTestId: string;
};


type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

Button.defaultProps = {
  size: BUTTON_SIZES.BASE,
  variant: VARIANTS.PRIMARY,
  role: ROLE.BUTTON,
  isLoading: false,
  isAccent: false,
  isCompact: false,
  isFixToBottom: false,
  isFullWidth: false,
  isDisabled: false,
  leadingIcon: null,
  trailingIcon: null,
  dataTestId: ''
} as DefaultProps;

export type Props = DefaultProps & RequiredProps & OptionalProps & ButtonProps & AnchorButtonProps;

export default Button;
