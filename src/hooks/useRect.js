import {useEffect, useRef, useState} from 'react';

export default function useRect() {
  const ref = useRef();
  const [box, setBox] = useState({});

  const set = () =>
    setBox(ref && ref.current ? ref.current.getBoundingClientRect() : {});

  useEffect(() => {
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return [box, ref];
};