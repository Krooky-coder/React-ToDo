import { useState } from "react";

export default function useLocalStorage<T> (key: string, defaultValue: T) {
    const storedValue = localStorage.getItem(key);
    const initialValue: T = storedValue ? JSON.parse(storedValue) : defaultValue;


    const [value, setValue] = useState<T>(initialValue);
    const setStoredValue = (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    };
  
    const removeValue = () => {
      localStorage.removeItem(key);
      setValue(defaultValue);
    };
  
    return [value, setStoredValue, removeValue] as const;
}

