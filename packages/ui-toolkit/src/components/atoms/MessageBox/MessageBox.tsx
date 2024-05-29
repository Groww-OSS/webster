import React from 'react';
import cn from 'classnames';

import { Info } from '@groww-tech/icon-store/mi';

import { Button } from '../Button';

import { BACKGROUNDS } from './messageBox.constants';
import { SIZES } from '../../../utils/constants';

import './messageBox.css';


const MessageBox = (props: Props) => {
  const {
    size,
    isIconPresent,
    background,
    content,
    dataTestId,
    isCompact,
    onContainerClick,
    actionCTA
  } = props;


  const isClickPresentOnContainer = onContainerClick && typeof onContainerClick === 'function';

  const rootClasses = cn(`valign-wrapper vspace-betweeen width100 mint-msgBox-container mint-msgBox-${size}`, {
    backgroundTertiary: background === BACKGROUNDS.NEUTRAL,
    backgroundWarningSubtle: background === BACKGROUNDS.WARNING,
    backgroundNegativeSubtle: background === BACKGROUNDS.ERROR,
    backgroundPositiveSubtle: background === BACKGROUNDS.POSITIVE,
    'mint-msgBox-compact': isCompact,
    'cur-po': isClickPresentOnContainer
  });

  const contentClasses = cn('mint-msgBox-block-content contentPrimary', {
    bodySmall: size === SIZES.SMALL || size === SIZES.XSMALL,
    bodyBase: size === SIZES.BASE,
    bodyLarge: size === SIZES.LARGE,
    bodyXLarge: size === SIZES.XLARGE
  });

  const defaultLeadingIcon = <Info
    size={20}
    color='contentPrimary'
  />;

  return (
    <div
      className={rootClasses}
      data-test-id={dataTestId.length ? dataTestId : null}
      {...(isClickPresentOnContainer && { onClick: onContainerClick })}
    >
      {/* Leading Icon */}
      {
        isIconPresent && (<div className='valign-wrapper mint-msgBox-icon'>
          {defaultLeadingIcon}
        </div>)
      }
      <div className='valign-wrapper mint-msgBox-block'>
        <div className={cn(contentClasses)}>{content}</div>
        {/* Optional CTA */}
        {actionCTA && (<div className='valign-wrapper mint-msgBox-block-cta'>{actionCTA}</div>)}
      </div>
    </div>
  );
};


type RequiredProps = {
  content: string;
};


type DefaultProps = {
  isIconPresent?: boolean;
  dataTestId: string;
  size: ValueOf<typeof SIZES>;
  background: ValueOf<typeof BACKGROUNDS>;
  isCompact: boolean;
  onContainerClick?: (e: React.MouseEvent) => void | null;
  actionCTA?: React.FC<typeof Button> | JSX.Element;
};


MessageBox.defaultProps = {
  isIconPresent: true,
  background: BACKGROUNDS.NEUTRAL,
  dataTestId: '',
  isOutlined: false,
  size: SIZES.SMALL,
  isCompact: false
} as DefaultProps;

export type Props = RequiredProps & DefaultProps;

export default React.memo(MessageBox);
