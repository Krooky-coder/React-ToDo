import { useEffect, useState, type KeyboardEvent } from "react";
import { Container, GroupContainer, ShowPassBtn, ErrorSpan, Header, LogoDiv, LogoSpan, LogoBtnContainer, LogoBtn, Body, LogForm, EyeIcon, LoginBtn } from "./style"
import { OPEN_EYE_PATHS, CLOSED_EYE_PATHS } from '../../assets/icons'
import { useAppSelector } from "../../hooks/useAppSeleсtor";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../api/auth";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function LoginForm() {
    const refreshFromServer = useAppSelector(state => state.auth.refreshToken);
    const tokenFromServer = useAppSelector(state => state.auth.token);
    const statusFromServer = useAppSelector(state => state.auth.status);
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const {setStoredValue: setStoredToken} = useLocalStorage<string>('Access Token', '');
    const {setStoredValue: setStoredRefreshToken} = useLocalStorage<string>('Refresh Token', '');
    
    const [Error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordValue, setPasswordValue] = useState<string>('');
    const [EmailValue, setEmailValue] = useState<string>('');
    
    useEffect(() => {
        if (tokenFromServer) {
            setStoredToken(tokenFromServer);
        }
        if (refreshFromServer) {
            setStoredRefreshToken(refreshFromServer);
        }
    }, [refreshFromServer, tokenFromServer, statusFromServer]);
    
    const handleLoginClick = async () => {
        setError('');
        
        const result = await dispatch(fetchLogin({ email: EmailValue, password: passwordValue }));

        if (fetchLogin.rejected.match(result)) {
            if (result.payload) {
                setError(result.payload);
                return;
            }  
        }

        navigate('/');
        setPasswordValue('');
        setEmailValue('');
    };

    const handleShowPassword = (): void => {
        setShowPassword(!showPassword);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            handleLoginClick();
        };
    };

    return (
        <Container>
            <GroupContainer>
                <Header>
                    <LogoDiv>
                        <LogoSpan>
                            Your ToDo
                        </LogoSpan>
                        <LogoBtnContainer>
                            <LogoBtn to='/register'>регистрация</LogoBtn>
                            <LogoBtn to='/login'>вход</LogoBtn>
                        </LogoBtnContainer>
                    </LogoDiv>
                </Header>
                <Body>
                    <ErrorSpan>{Error}</ErrorSpan>
                    <LogForm
                        type="text" 
                        placeholder="E-mail"
                        value={EmailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        onKeyDown={handleKeyDown} 
                        />
                    <LogForm
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        minLength={6}
                        onKeyDown={handleKeyDown} 
                        />
                    <ShowPassBtn onClick={handleShowPassword}>
                        <EyeIcon>
                            {showPassword ? OPEN_EYE_PATHS : CLOSED_EYE_PATHS}
                        </EyeIcon>  
                    </ShowPassBtn>
                    <LoginBtn onClick={handleLoginClick}>вход</LoginBtn>
                </Body>
            </GroupContainer>
        </Container>
    )
}

