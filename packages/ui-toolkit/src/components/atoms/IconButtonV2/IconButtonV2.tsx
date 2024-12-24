import React from 'react';
import { ReactIconComponentType } from '@groww-tech/icon-store/types.d';
import './styles/index.css';

export type IconButtonProps = {
  onClick: () => void;
  Icon: ReactIconComponentType;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isCompact?: boolean;
  shape?: 'circle' | 'square';
  outline?: boolean;
  // selectedColor?: 'neutral' | 'accent';
};


const IconButtonV2: React.FC<IconButtonProps> = ({
  onClick,
  Icon,
  disabled = false,
  loading = false,
  size = 'md',
  isCompact = false,
  shape = 'circle',
  outline = false
  // selectedColor = 'neutral',
}) => {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
    >
      <div>
        <Icon />
      </div>
    </button>
  );
};

export default IconButtonV2;
