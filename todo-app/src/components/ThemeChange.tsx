import useLocalStorage from "../utils/localStorage"

interface ThemeChangeProps {
    setTheme: ( val:string ) => void
}

export default function ThemeChange ( {setTheme}: ThemeChangeProps ) {
    
    const [theme, _] = useLocalStorage<string>('Theme', 'light')

    function handleToggleTheme () {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <button onClick={handleToggleTheme}>
            Переключить
        </button>
    )
}