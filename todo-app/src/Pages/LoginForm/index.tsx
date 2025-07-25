import { useEffect, useState, type KeyboardEvent } from "react";
import { Container, GroupContainer, ShowPassBtn, ErrorSpan, Header, LogoDiv, LogoSpan, LogoBtnContainer, LogoBtn, Body, LogForm, ShowPass, EyeIcon, LoginBtn } from "./style"
import { OPEN_EYE_PATHS, CLOSED_EYE_PATHS } from '../../assets/icons'
import { useAppSelector } from "../../utils/useAppSeleсtor";
import useLocalStorage from "../../utils/localStorage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from '../../store';
import { fetchLogin } from "../../api/auth";

export default function LoginForm() {
    const tokenFromServer = useAppSelector(state => state.auth.token);
    const statusFromServer = useAppSelector(state => state.auth.status);
    const {setStoredValue: setStoredToken} = useLocalStorage('Access Token', '');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [Error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [EmailValue, setEmailValue] = useState('');

    useEffect(() => {
        if (tokenFromServer) {
            setStoredToken(tokenFromServer);
        }
        if (statusFromServer === 'failed') {
            setError('E-mail or Password wrong');
        };
        if (statusFromServer === 'successful') {
            navigate('/', { replace: true });
        };
    }, [tokenFromServer, statusFromServer])

    const handleLoginClick = async () => {
        setError('');
        setError('');

        if (EmailValue === '') {
            setError(`Email Form can't be empty`);
            return;
        };
        
        if (passwordValue === '') {
            setError(`Password Form can't be empty`);
            return;
        };
        
        await dispatch(fetchLogin({ email: EmailValue, password: passwordValue }));

        setPasswordValue('');
        setEmailValue('');

    };

    
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
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

