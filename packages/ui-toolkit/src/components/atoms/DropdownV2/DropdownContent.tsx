import React from 'react';

import cx from 'classnames';

import './dropDown.css';


const DropdownContentV2 = (props: Props) => {
  const { children, className, animate, position = 'bottom', horizontalPosition = 'right', ...dropdownContentProps } = props;

  const contentClasses = cx(
    'dropdown-v2--content', className,
    {
      'dropdown-v2--fadein': animate,
      'dropdown-v2--position--top': position === 'top',
      'dropdown-v2--position--bottom': position === 'bottom',
      'dropdown-v2--position--left': horizontalPosition === 'left',
      'dropdown-v2--position--right': horizontalPosition === 'right'
    }
  );

  return (
    <div className={contentClasses}
      {...dropdownContentProps}
    >
      {children}
    </div>
  );
};

DropdownContentV2.displayName = 'DropdownContentV2';

DropdownContentV2.defaultProps = {
  className: '',
  animate: true,
  position: 'bottom',
  horizontalPosition: 'right'
} as DefaultProps;


type RequiredProps = {
  children: React.ReactNode;
}


type DefaultProps = {
  className: string;
  animate: boolean;
  position: 'top' | 'bottom';
  horizontalPosition: 'left' | 'right';
}


type Props = RequiredProps & DefaultProps;

export default DropdownContentV2;
