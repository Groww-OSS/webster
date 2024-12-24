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
  size?: 'sm' | 'md' | 'lg';
  isCompact?: boolean;
  shape?: 'circle' | 'square';
};


const IconButtonV2: React.FC<IconButtonProps> = ({
  onClick,
  Icon,
  disabled = false,
  isLoading = false,
  size = 'md',
  isCompact = false,
  shape
}) => {
  const iconBtnContainerClass = cn({
    [`icon-btn-container-${size}-compact`]: isCompact && !shape,
    [`icon-btn-container-${size}-${shape}`]: shape,
    [`icon-btn-container-${size}`]: !isCompact && !shape
  });

  // Class for button border based on shape and disabled state
  const iconBtnBorderClass = cn({
    ['icon-btn-border-none']: !shape || (shape && disabled),
    ['borderPrimary']: shape && !disabled
  });

  // Placeholder for background class logic
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
      className={cn(iconBtnContainerClass, iconBtnBorderClass, iconBtnBackgroundClass, iconBtnColorClass)}
    >
      {
        isLoading ? (
          <MdsIcSpinnerLoader
            size={20}
            className="icon-spinner"
          />
        ) : (
          <Icon size={20} />
        )
      }
    </button>
  );
};

export default IconButtonV2;
