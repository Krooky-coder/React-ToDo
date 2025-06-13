import DarkSvg from '../SVG\'s/DarkSvg';
import LightSvg from '../SVG\'s/LightSvg';
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
                {theme === 'light' ? (
                    <LightSvg />
                ) : (
                    <DarkSvg />
                )}
            </ToggleIcon>
        </ButtonThemeChange>
    );
}
