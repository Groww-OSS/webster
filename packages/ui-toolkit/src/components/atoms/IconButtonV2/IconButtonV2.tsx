import React from 'react';
import cn from 'classnames';
import { ReactIconComponentType } from '@groww-tech/icon-store/types.d';

import './styles/index.css';
export type IconButtonProps = {
  onClick: () => void;
  icon: ReactIconComponentType;
  disabled?: boolean;
};


const IconButtonV2: React.FC<IconButtonProps> = ({ onClick, icon, disabled }) => {
  return (
    <button
      onClick={onClick}
      className="iconButton"
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default IconButtonV2;
