import React from 'react';
import { ReactIconComponentType } from '@groww-tech/icon-store/types.d';
import './styles/index.css';

export type IconButtonProps = {
  onClick: () => void;
  Icon: ReactIconComponentType;
  size?: 'small' | 'medium';
  disabled?: boolean;
  contentColor?: 'contentPrimary'
  | 'contentSecondary'
  | 'contentTertiary'
  | 'contentInversePrimary'
  | 'contentInverseSecondary'
  | 'contentAccent'
  | 'contentNegative'
  | 'contentWarning'
  | 'contentPositive'
  | 'contentDisabled'
  | 'contentOnColour'
  | 'contentOnColourInverse'
  | 'contentAccentSecondary'
  | 'contentAccentSecondarySubtle';
  dataTestId?: string;
};


const TempIconButtonV2: React.FC<IconButtonProps> = ({
  onClick,
  Icon,
  size = 'medium',
  disabled = false,
  contentColor = 'contentPrimary',
  dataTestId
}) => {

  return (
    <button
      onClick={onClick}
      className={
        `iconButton ${size === 'small' ? 'iconBtnSmall' : 'iconBtnMedium'} ${
          disabled ? 'contentDisabled' : `${contentColor} backgroundTransparentHover`
        }`
      }
      disabled={disabled}
      data-test-id={dataTestId}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <Icon size={20} />
    </button>
  );
};

export default TempIconButtonV2;
