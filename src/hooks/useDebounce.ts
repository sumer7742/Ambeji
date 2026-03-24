import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

/**
 * useDebounce hook (uses lodash.debounce)
 * @author - Rampravesh Kumar Yadav
 * @param value - Value to debounce (string, number, object, etc.)
 * @param delay - Debounce delay in milliseconds (default 500)
 * @returns The debounced value
 */
export const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debouncedSetter = useMemo(() => {
    const handler = debounce((val: T) => {
      setDebouncedValue(val);
    }, delay);

    return handler;
  }, [delay]);

  useEffect(() => {
    debouncedSetter(value);
    return () => {
      debouncedSetter.cancel();
    };
  }, [value, debouncedSetter]);

  return debouncedValue;
};
