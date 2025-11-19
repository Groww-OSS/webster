import { useState, useEffect } from 'react';

export const useIsDocumentHidden = () => {
  const [ isDocumentHidden, setIsDocumentHidden ] = useState(document.hidden);

  useEffect(() => {
    const callback = () => {
      setIsDocumentHidden(document.hidden);
    };

    document.addEventListener('visibilitychange', callback);
    return () => document.removeEventListener('visibilitychange', callback);
  }, []);

  return isDocumentHidden;
};
