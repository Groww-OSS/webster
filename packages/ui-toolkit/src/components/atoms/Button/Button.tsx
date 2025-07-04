import React from 'react';
import cn from 'classnames';

import { ReactIconProps } from '@groww-tech/icon-store';

import {
  VARIANTS,
  BUTTON_SIZES,
  ROLE,
  DEFAULT_TABINDEX
} from './Button.constants';
import { Loader, LOADER_TYPE } from '../Loader';
import { ICON_POSITION } from '../../../utils/constants';

import { isEmpty } from '../../../utils/helper';
import './styles/index.css';


const isValidHyperLink = (href: string | undefined): boolean => {
  return (
    !isEmpty(href) && (!(href === '#' || href === 'javascript:void(0)'))
  );
};


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
    gradientClass,
    onClick
  } = props;

  const primaryButtonClasses = cn('mint-btn-primary',
    {
      contentOnColour: !isLoading && !isDisabled,
      backgroundAccent: !isDisabled || (isLoading && isDisabled)
    });

  const secondaryButtonClasses = cn('mint-btn-secondary', {
    'mint-btn-secondary-default': !isAccent,
    'mint-btn-secondary-accent backgroundAccentSubtle': (isAccent && !isDisabled) || (isAccent && isDisabled && isLoading),
    'mint-btn-secondary-default-border': !isAccent && !isDisabled
  });

  const tertiaryButtonClasses = cn('mint-btn-tertiary', {
    'mint-btn-tertiary-accent': isAccent && !isDisabled && !isLoading,
    'mint-btn-tertiary-default': !isAccent && !isDisabled,
    'mint-btn-tertiary-disabled': isDisabled && !isLoading
  });

  const postiveButtonClasses = cn('mint-btn-primary', {
    backgroundPositive: !isDisabled || (isLoading && isDisabled),
    contentOnColour: !isLoading && !isDisabled
  });

  const negativeButtonClasses = cn('mint-btn-negative', {
    backgroundNegative: !isDisabled || (isLoading && isDisabled),
    contentOnColour: !isLoading && !isDisabled
  });

  const fontClasses = cn({
    bodySmallHeavy: size === BUTTON_SIZES.SMALL,
    bodyBaseHeavy: size === BUTTON_SIZES.BASE,
    bodyLargeHeavy: size === BUTTON_SIZES.LARGE,
    contentDisabled: isDisabled,
    contentPrimary: !isAccent && !isDisabled && !isLoading,
    contentAccent: isAccent && !isDisabled && !isLoading
  });


  const baseClasses = cn('mint-btn-default absolute-center backgroundTransparent pos-rel', fontClasses,
    {
      'cur-po': !isLoading && !isDisabled,
      'mint-btn-cursor-default': isLoading,
      'mint-btn-small': size === BUTTON_SIZES.SMALL,
      'mint-btn-medium': size === BUTTON_SIZES.BASE,
      'mint-btn-large': size === BUTTON_SIZES.LARGE,
      'mint-btn-full-width': isFullWidth,
      'mint-btn-loader': isLoading,
      'mint-btn-compact': variant === VARIANTS.TERTIARY && isCompact,
      'mint-btn-disabled backgroundDisabled': isDisabled && !isLoading
    });


  const loaderClasses = cn('mint-btn-loader-item', {
    'mint-btn-loader-item-border-white': variant === VARIANTS.PRIMARY || variant === VARIANTS.POSITIVE || variant === VARIANTS.NEGATIVE,
    'mint-btn-loader-item-border-gray': (variant === VARIANTS.SECONDARY || variant === VARIANTS.TERTIARY) && !isAccent
  });

  const fixedToBottomClass = cn({
    'mint-btn-fixed-bottom': isFixToBottom,
    borderPrimary: isFixToBottom,
    backgroundPrimary: isFixToBottom
  });

  const borderBottomClasses = cn({
    'mint-btn-tertiary-label-border': variant === VARIANTS.TERTIARY && !isAccent,
    borderNeutral: variant === VARIANTS.TERTIARY && !isDisabled && !isLoading && !isAccent,
    borderDisabled: variant === VARIANTS.TERTIARY && isDisabled && !isLoading && !isAccent
  });

  const gradientButtonClasses = cn(
    {
      contentOnColour: !isLoading && !isDisabled,
      [gradientClass]: !isDisabled || (isLoading && isDisabled),
      borderPrimary: isDisabled && !isLoading && !isAccent
    }
  );


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

      case VARIANTS.GRADIENT:
        return cn(baseClasses, gradientButtonClasses);

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


  const getButtonElement = (Component: React.ElementType<ButtonProps | AnchorButtonProps>, props: any) => {
    return (
      <Component
        className={getButtonClassesBasedOnVariant()}
        data-test-id={dataTestId?.length ? dataTestId : null}
        onClick={onButtonClick}
        tabIndex={DEFAULT_TABINDEX}
        {...props}
      >
        {renderButtonContent()}
      </Component>
    );
  };


  const LinkButtonRender = () => {
    const linkProps = {
      role: ROLE.BUTTON,  // We are adding the role of "button" to the <a> element since we are using it as a button. Additionally, the <button> element does not need a role attribute, as the semantic tag is sufficient.
      ...((!isDisabled && !isLoading) && { href }),
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
        isLoading && <div className="absolute-center mint-btn-loader-wrapper">
          <Loader
            loaderType={LOADER_TYPE.CIRCULAR}
            loaderClassName={loaderClasses}
          />
        </div>
      }
      <>
        {leadingIcon && getIconUI(ICON_POSITION.LEADING)}

        <span className={cn('truncate', borderBottomClasses)}>
          {buttonText}
        </span>

        {trailingIcon && getIconUI(ICON_POSITION.TRAILING)}
      </>
    </>
  );


  const renderButton = () => {
    /* If a link doesn't have a meaningful href, it should be rendered using a <button> element.
      Ref : https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md#fail */

    if (role === ROLE.LINK && isValidHyperLink(href)) {
      return LinkButtonRender();
    }

    return DefaultButtonRender();
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
  dataTestId?: string;
  gradientClass: string;
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
  dataTestId: '',
  gradientClass: ''
} as DefaultProps;

export type Props = DefaultProps & RequiredProps & OptionalProps & ButtonProps & AnchorButtonProps;

export default Button;
