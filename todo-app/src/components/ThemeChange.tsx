import styled from "styled-components";
import useLocalStorage from "../utils/localStorage"

interface ThemeChangeProps {
    setTheme: ( val:string ) => void
}

const ButtonThemeChange = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: solid 1px ${props => props.theme.main};
  cursor: pointer;
  padding: 7px;

  &:focus {
    outline: none
  }
`;
const ToggleIcon = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
  })` 
    width: 100%;
    height: 100%;
    fill: ${props => props.theme.main};
`;

export default function ThemeChange ( {setTheme}: ThemeChangeProps ) {
    
    const [theme, _] = useLocalStorage<'light' | 'dark'>('Theme', 'light')

    function handleToggleTheme () {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <ButtonThemeChange onClick={handleToggleTheme}>
            <ToggleIcon>
                {theme === 'light' ? (<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />)
                : (<path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121z" />)}
            </ToggleIcon>
        </ButtonThemeChange>
    )
}