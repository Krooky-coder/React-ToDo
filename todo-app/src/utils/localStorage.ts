export default function useLocalStorage<T> (key: string, defaultValue: T) {
    const storedValue = localStorage.getItem(key);
    const initialValue: T = storedValue ? JSON.parse(storedValue) : defaultValue;

    const setStoredValue = (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    };
  
    const removeValue = (key: string) => {
      localStorage.removeItem(key);
    };
  
    return {
      initialValue, setStoredValue, removeValue
    }
}