import { useEffect, useState } from "react";

export default function useLocalStorage<T> (key: string, defaultValue: T) {
    const [value, setValue] = useState<T>( () => {
        const storageValue = localStorage.getItem(key)
        return storageValue ? JSON.parse(storageValue) : defaultValue
    })
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    const clearStorage = () => {
        setValue(defaultValue);
    };

    return [value, setValue, clearStorage] as const
}

