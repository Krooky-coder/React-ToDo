import { Container, GroupContainer, ShowPassBtn, ErrorSpan, Header, LogoDiv, LogoSpan, LogoBtnContainer, LogoBtn, Body, LogForm, EyeIcon, RegisterBtn } from "./style"
import { OPEN_EYE_PATHS, CLOSED_EYE_PATHS } from '../../assets/icons'
import { useEffect, useState, type KeyboardEvent} from 'react';
import { fetchRegister } from "../../api/auth";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAppSelector } from "../../hooks/useAppSeleсtor";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function RegisterForm() { 
    const refreshFromServer = useAppSelector(state => state.auth.refreshToken);
    const tokenFromServer = useAppSelector(state => state.auth.token);
    const statusFromServer = useAppSelector(state => state.auth.status);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const {setStoredValue: setStoredToken} = useLocalStorage<string>('Access Token', '')
    const {setStoredValue: setStoredRefreshToken} = useLocalStorage<string>('Refresh Token', '');
            
    const [Error, setError] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [EmailValue, setEmailValue] = useState<string>('');
    const [ageValue, setAgeValue] = useState<number | string>('');

    useEffect(() => {
        if (tokenFromServer) {
            setStoredToken(tokenFromServer);
        };
        if (refreshFromServer) {
            setStoredRefreshToken(refreshFromServer);
        }
    }, [tokenFromServer, statusFromServer])
    
    const age = Number(ageValue);
    const handleRegistrationClick = async () => {
        setError('');
        
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(EmailValue)) {
            setError('Invalid Email');
            return;
        };
        
        if (passwordValue.length < 6) {
            setError('Password too short');
            return;
        };
        
        const result = await dispatch(fetchRegister({ email: EmailValue, password: passwordValue, age }));

        if (fetchRegister.rejected.match(result)) {
            if (result.payload) {
                setError(result.payload);
                return;
            }
        }

        navigate('/', { replace: true });
        setPasswordValue('');
        setAgeValue('');
        setEmailValue('');
    };
    
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleRegistrationClick();
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
                    <LogForm 
                    value={ageValue}
                    onChange={(e) => setAgeValue(e.target.value)}
                    placeholder="Age (optional)"
                    type="number"
                    min={1}
                    max={120}
                    step={1}
                    onKeyDown={handleKeyDown} 
                    />
                    <ShowPassBtn onClick={handleShowPassword}>
                        <EyeIcon>
                            {showPassword ? OPEN_EYE_PATHS : CLOSED_EYE_PATHS}
                        </EyeIcon>  
                    </ShowPassBtn>
                    <RegisterBtn onClick={handleRegistrationClick}>Зарегестрироваться</RegisterBtn>
                </Body>
            </GroupContainer>
        </Container>
    )
}



