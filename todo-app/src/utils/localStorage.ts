import { useEffect, useState } from "react";

export default function useLocalStorage<T> (key: string, defaultValue: T) {
    const storedValue = localStorage.getItem(key);
    const initialValue: T = storedValue ? JSON.parse(storedValue) : defaultValue;

    const [value, setReactState] = useState<T>(initialValue);

    useEffect(() => {
    },[value])

    const setStoredValue = (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setReactState(newValue);
    };
  
    const removeValue = () => {
      localStorage.removeItem(key);
      setReactState(defaultValue)
    };
  
    return {
      initialValue, setStoredValue, removeValue
    }
}