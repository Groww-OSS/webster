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
};


const TempIconButtonV2: React.FC<IconButtonProps> = ({
  onClick,
  Icon,
  size = 'medium',
  disabled = false,
  contentColor = 'contentPrimary'
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
    >
      <Icon size={20} />
    </button>
  );
};

export default TempIconButtonV2;
