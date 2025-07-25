import { Container, GroupContainer, ShowPassBtn, ErrorSpan, Header, LogoDiv, LogoSpan, LogoBtnContainer, LogoBtn, Body, LogForm, EyeIcon, RegisterBtn } from "./style"
import { OPEN_EYE_PATHS, CLOSED_EYE_PATHS } from '../../assets/icons'
import { useEffect, useState, type KeyboardEvent} from 'react';
import { useDispatch } from "react-redux";
import { fetchRegister } from "../../api/auth";
import type { AppDispatch } from '../../store';
import useLocalStorage from "../../utils/localStorage";
import { useAppSelector } from "../../utils/useAppSeleсtor";
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() { 
    const tokenFromServer = useAppSelector(state => state.auth.token);
    const statusFromServer = useAppSelector(state => state.auth.status);
    const {setStoredValue: setStoredToken} = useLocalStorage('Access Token', '')
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [Error, setError] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [EmailValue, setEmailValue] = useState('');
    const [ageValue, setAgeValue] = useState<number | string>('');

    useEffect(() => {
        if (tokenFromServer) {
            setStoredToken(tokenFromServer);
        };

        if (statusFromServer === 'failed') {
            setError('Server Errore');
            return;
        };
        if (statusFromServer === 'successful') {
            navigate('/', { replace: true });
        };
    }, [tokenFromServer, statusFromServer])

    const age = Number(ageValue);
    const handleRegistrationClick = async () => {
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

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(EmailValue)) {
            setError('Invalid Email');
            return;
        };

        if (!/^(?=.*[0-9])/.test(EmailValue)) {
            setError(`Email must contain number`);
            return;
        };

        if (passwordValue.length < 6) {
            setError('Password too short');
            return;
        };
        
        await dispatch(fetchRegister({ email: EmailValue, password: passwordValue, age }));

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



