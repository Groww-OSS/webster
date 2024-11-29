import React from 'react';


import './toggleSelection.css';


const ToggleSelection = (props: Props) => {
  const { leftText, rightText, isActive, onChange, parentClass } = props;

  const choiceClasses = 'bodyLargeHeavy fullWidth absolute-center tc341ChoiceClass ';
  const activeChoiceClasses = choiceClasses + 'contentAccent tc341ActiveChoice';
  const inActiveChoiceClasses = choiceClasses + 'contentPrimary tc341InactiveChoice';

  const leftTextClasses = isActive ? activeChoiceClasses : inActiveChoiceClasses;
  const rightTextClasses = !isActive ? activeChoiceClasses : inActiveChoiceClasses;


  const changeChoice = (turnActive: boolean) => {
    if (onChange && (turnActive !== isActive)) {
      onChange(isActive);
    }
  };


  return (
    <div className={`valign-wrapper tc341ToggleWrapper borderAccent ${parentClass}`}>
      <div
        className={leftTextClasses}
        onClick={() => changeChoice(true)}
      >
        {leftText}
      </div>
      <div className='tc341Divider backgroundAccent'></div>
      <div
        className={rightTextClasses}
        onClick={() => changeChoice(false)}
      >
        {rightText}
      </div>
    </div>
  );

};


const defaultProps: DefaultProps = {
  parentClass: '',
  leftText: 'En',
  rightText: 'हि',
  activeBackgroundColor: 'var(--green500)',
  inactiveBackgroundColor: 'var(--gray700)'
};


type RequiredProps = {
  isActive: boolean;
  onChange: (isActive: boolean) => void;
}


type DefaultProps = {
  parentClass: string;
  leftText: React.ReactNode;
  rightText: React.ReactNode;
  activeBackgroundColor: string;
  inactiveBackgroundColor: string;
}


ToggleSelection.defaultProps = defaultProps;

export type Props = RequiredProps & DefaultProps;

export default ToggleSelection;
