import { useCallback, useEffect } from 'react';

const useScroll = (arr, maxLength) => {
  const scrollToBottom = useCallback(() => {
    if (arr.length > maxLength) {
      document.getElementById('bottom').scrollIntoView(false);
    } else {
      document.getElementById('bottom').scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  }, [arr.length, maxLength]);

  const scrollToTop = useCallback(() => {
    if (arr.length > maxLength) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [arr.length, maxLength]);

  useEffect(() => {
    scrollToBottom();
  }, [arr, scrollToBottom]);

  return { scrollToBottom, scrollToTop };
};

export { useScroll };