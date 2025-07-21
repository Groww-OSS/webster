import React from 'react';


const DropdownTriggerV2 = (props: Props) => {
  const { children, className, ...dropdownTriggerProps } = props;

  return (
    <div className={`.dropdown-v2--trigger ${className}`}
      {...dropdownTriggerProps}
    >
      {children}
    </div>
  );
};

DropdownTriggerV2.displayName = 'DropdownTriggerV2';
DropdownTriggerV2.defaultProps = {
  className: ''
} as DefaultProps;


type RequiredProps = {
  children: React.ReactNode;
}


type DefaultProps = {
  className: string;
}


type Props = RequiredProps & DefaultProps;

export default DropdownTriggerV2;
