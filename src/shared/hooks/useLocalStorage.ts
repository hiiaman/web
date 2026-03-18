import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    const toStore = value instanceof Function ? value(stored) : value;
    setStored(toStore);
    window.localStorage.setItem(key, JSON.stringify(toStore));
  };

  return [stored, setValue] as const;
}
