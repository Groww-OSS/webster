import React from 'react';

import './tag.css';


const Tag = (props: Props) => {
  const childrenCount = React.Children.count(props.children);

  if (!childrenCount) {
    return null;
  }

  let tagClass = props.tagClass;

  if (props.isWarning) {
    tagClass += 'backgroundWarningSubtle contentPrimary';

  } else if (props.isError) {
    tagClass += 'backgroundNegativeSubtle contentPrimary';

  } else if (props.isInfo) {
    tagClass += 'contentPrimary backgroundAccentSubtle';
  }

  if (childrenCount === 1) {
    tagClass += ' absolute-center';

  } else {
    tagClass += ' valign-wrapper vspace-between';
  }

  return (
    <div className={`width100 tg11Container  bodySmall ${tagClass}`}>
      {props.children}
    </div>
  );
};


export type Props = {
  isWarning: boolean;
  isError: boolean;
  isInfo: boolean;
  tagClass: string;
  children: React.ReactNode;
}

Tag.defaultProps = {
  isWarning: true,
  isError: false,
  isInfo: false,
  tagClass: ''
} as Props;

export default Tag;
