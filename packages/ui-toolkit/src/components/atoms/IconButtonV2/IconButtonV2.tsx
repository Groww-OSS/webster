import React from 'react';
import { ReactIconComponentType } from '@groww-tech/icon-store/types.d';
import { MdsIcSpinnerLoader } from '@groww-tech/icon-store/mint-icons';
import cn from 'classnames';
import './styles/index.css';

export type IconButtonProps = {
  onClick: () => void;
  Icon: ReactIconComponentType;
  disabled?: boolean;
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
  isCompact?: boolean;
  shape?: 'circle' | 'square';
};


const IconButtonV2: React.FC<IconButtonProps> = ({
  onClick,
  Icon,
  disabled = false,
  isLoading = false,
  size = 'medium',
  isCompact = false,
  shape
}) => {
  const iconBtnContainerSizeClass = cn({
    [`icon-btn-container-${size}-compact`]: isCompact && !shape,
    [`icon-btn-container-${size}`]: !isCompact || shape
  });

  const iconBtnContainerShapeClass = cn({
    ['icon-btn-container-circle']: !shape || shape === 'circle',
    ['icon-btn-container-square']: shape === 'square'
  });

  const iconBtnBorderClass = cn({
    ['icon-btn-border-none']: !shape || (shape && disabled),
    ['borderPrimary']: shape && !disabled
  });

  const iconBtnBackgroundClass = cn({
    ['icon-btn-background-disabled']: (disabled && shape) || isLoading,
    ['backgroundTransparentHover']: !disabled

  });

  const iconBtnColorClass = cn({
    ['contentDisabled']: disabled,
    ['contentprimary']: !disabled
  });


  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(iconBtnContainerSizeClass, iconBtnContainerShapeClass, iconBtnBorderClass, iconBtnBackgroundClass, iconBtnColorClass, 'cur-po')}
    >
      {
        isLoading ? (
          <MdsIcSpinnerLoader
            size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
            className="icon-spinner"
          />
        ) : (
          <Icon size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
        )
      }
    </button>
  );
};

export default IconButtonV2;
