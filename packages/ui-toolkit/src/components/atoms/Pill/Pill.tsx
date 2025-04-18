import React from 'react';
import cn from 'classnames';

import { ReactIconProps } from '@groww-tech/icon-store';
import { SIZES } from '../../../utils/constants';

import './pill.css';


const Pill = (props: Props) => {
  const {
    size,
    text,
    leadingIcon,
    trailingIcon,
    isAccent,
    isSelected,
    isOutlined
  } = props;


  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    const { onClick } = props;

    onClick(e);
  };

  const pillIconProps = {
    size: 20
  };

  const baseClasses = cn('pill12Pill', 'absolute-center', 'cur-po', 'valign-wrapper', `pill12Size${size}`,
    {
      'backgroundPrimary borderPrimary': isOutlined && !isAccent && !isSelected,
      contentPrimary: !isAccent,
      pill12PillHover: !isSelected && !isAccent,
      'borderNeutral backgroundTertiary': isSelected && !isAccent,
      'borderAccent contentAccent': isAccent,
      backgroundPositiveSubtle: isSelected && isAccent
    });

  const labelClasses = cn({
    bodySmallHeavy: size === SIZES.SMALL || size === SIZES.XSMALL,
    bodyBaseHeavy: size === SIZES.BASE,
    bodyLargeHeavy: size === SIZES.LARGE || size === SIZES.XLARGE
  });

  return (
    <div className={baseClasses}
      onClick={handleClick}
    >
      {leadingIcon && <span className='valign-wrapper'>{leadingIcon?.(pillIconProps)}</span>}
      <span className={labelClasses}>{text}</span>
      {trailingIcon && <span className='valign-wrapper'>{trailingIcon?.(pillIconProps)}</span>}
    </div>
  );
};


type RequiredProps = {
  text: string;
}


type DefaultProps = {
  size: ValueOf <typeof SIZES>;
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  isSelected: boolean;
  isAccent: boolean;
  isOutlined: boolean;
  leadingIcon: ((props: ReactIconProps) => JSX.Element) | null;
  trailingIcon: ((props: ReactIconProps) => JSX.Element) | null;
};

export type Props = RequiredProps & DefaultProps;

Pill.defaultProps = {
  size: SIZES.BASE,
  onClick: () => {},
  isSelected: false,
  isOutlined: true,
  isAccent: true,
  leadingIcon: null,
  trailingIcon: null
} as DefaultProps;

export default React.memo(Pill);
