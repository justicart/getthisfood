import {useRef, useState, useEffect} from 'react';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const firstDebounce = useRef(true);

  useEffect(() => {
    if (value && firstDebounce.current) {
      setDebouncedValue(value);
      firstDebounce.current = false;
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}