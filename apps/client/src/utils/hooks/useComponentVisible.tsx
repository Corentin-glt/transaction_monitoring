import { useEffect, useRef, useState } from 'react';

export default function useComponentVisible(
  initialIsVisible = false
) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickInAndOut = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!ref.current) return;

    if (!ref.current.contains(target)) {
      return setIsComponentVisible(false);
    }

    return setIsComponentVisible(true);
  };

  useEffect(() => {
    document.addEventListener(
      'click',
      handleClickInAndOut,
      true
    );
    return () => {
      document.removeEventListener(
        'click',
        handleClickInAndOut,
        true
      );
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
