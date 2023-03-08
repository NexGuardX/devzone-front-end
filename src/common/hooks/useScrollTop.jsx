import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function useScrollTop() {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    console.log('⏩ ~ useEffect ~ ref.current:', ref);
    if (ref.current) {
      ref.current.scrollTo({ top: 0 });
    }
  }, [location.pathname]);

  return ref;
}

export default useScrollTop;
