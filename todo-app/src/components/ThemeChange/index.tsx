import DarkThemeSvg from '../SVG\'s/DarkThemeSvg';
import LightThemeSvg from '../SVG\'s/LightThemeSvg';
import { ToggleIcon } from '../SVG\'s/style';
import { ButtonThemeChange } from './style';

interface ThemeChangeProps {
    setTheme: (val:string) => void;
    theme: string;
}

export default function ThemeChange({ setTheme, theme }: ThemeChangeProps) {
    const handleToggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    
    return (
        <ButtonThemeChange onClick={handleToggleTheme}>
            <ToggleIcon>
                {theme === 'light' ? <LightThemeSvg /> : <DarkThemeSvg />}
            </ToggleIcon>
        </ButtonThemeChange>
    );
}
