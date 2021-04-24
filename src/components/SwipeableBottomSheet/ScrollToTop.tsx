import { FC, useEffect } from 'react';
import { ScrollToTopProps } from './scroll-to-top.interfaces';

const ScrollToTop: FC<ScrollToTopProps> = ({ element }) => {
  useEffect(() => {
    const insideElement = element();
    if (insideElement) insideElement.scrollTop = 0;
  }, [element]);
  return null;
};

export default ScrollToTop;
