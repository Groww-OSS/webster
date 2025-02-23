import React from 'react';
import type { ReactIconComponentType } from '@groww-tech/icon-store';
import { ContentMintTokens } from '../../../types/mint-token-types/content-mint-tokens';

import './styles/index.css';

export type TempIconButtonV2Props = {
  onClick: () => void;
  Icon: ReactIconComponentType;
  size?: 'small' | 'medium';
  disabled?: boolean;
  iconColor?: ContentMintTokens;
  dataTestId?: string;
};


const TempIconButtonV2: React.FC<TempIconButtonV2Props> = ({
  onClick,
  Icon,
  size = 'medium',
  disabled = false,
  iconColor = 'contentPrimary',
  dataTestId
}) => {

  return (
    <button
      onClick={onClick}
      className={
        `iconButton ${size === 'small' ? 'iconBtnSmall' : 'iconBtnMedium'} ${
          disabled ? 'contentDisabled' : `${iconColor} backgroundTransparentHover`
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
