import { useEffect, useState } from "react";
import { useAppSelector } from "../../utils/useAppSeleсtor"
import { useDispatch } from "react-redux";
import { ChangePass, fetchProfile, fetchRefresh } from "../../api/auth";
import useLocalStorage from "../../utils/localStorage";
import { type AppDispatch } from "../../store";
import { Container, Header, ErrorSpan, ProfileDiv, Span, Ul, InputsDiv, ChangePassDiv, ChangePassBtn, PassP, CustomInput } from "./style";
import ThemeChange from "../../components/ThemeChange";
import ProfileBurger from "../../components/ProfileBurger";
import { TokenIsExpired } from "../../utils/RefreshToken";

export const ProfilePage = () => {
    const { initialValue: themeValue, setStoredValue: storeThemeValue } = useLocalStorage<string>('Theme', 'light');
    const { initialValue: accessToken, setStoredValue: storeAccessToken} = useLocalStorage('Access Token', '');
    const { initialValue : refreshToken } = useLocalStorage('Refresh Token', '');

    const profile = useAppSelector(state => state.auth.user);
    const loadingStatus = useAppSelector((state) => state.todos.onLoading);
    const status = useAppSelector(state => state.auth.status);
    const erroeMessage = useAppSelector(state => state.auth.errorMessage);
    const dispatch = useDispatch<AppDispatch>();

    const [theme, setTheme] = useState<string>(themeValue);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordAgain, setNewPasswordAgain] = useState('');
    const [message, setMessage] = useState('');

    const clearAllForms = () => {
        setOldPassword('');
        setNewPassword('');
        setNewPasswordAgain('');
    }

    useEffect(() => {
        // if (TokenIsExpired(accessToken) && tokenFromServer) {
        //     dispatch(fetchRefresh({ refreshToken }));
        //     storeAccessToken(tokenFromServer);
        // }    
        // dispatch(fetchProfile({ accessToken }));
        storeThemeValue(theme);
    }, [theme, accessToken])

    const handlePassChangeClick = async () => {
        if (erroeMessage === 'Ошибка сервера') {
            setMessage('Ошибка сервера');
            return;
        }
        if (oldPassword.length === 0) {
            setMessage(`Old pass cant be empty`);
            clearAllForms();
            return;
        }
        if (newPassword !== newPasswordAgain) {
            setMessage(`New password's are different`);
            clearAllForms();
            return;
        }
        await dispatch(ChangePass({ accessToken, oldPassword, newPassword }));
        if (status === 'failed') {
            setMessage('Wrong password');
            clearAllForms();
            return;
        }
        if (newPassword.length < 6) {
            setMessage('new password too short');
            clearAllForms();
            return;
        }
        setMessage('password change successfuly');
        clearAllForms();
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault(); 
    };

    return (
    <>  
        {loadingStatus ? (
            <span>loading...</span>
            ) : ( 
                <>
                <Container>
                    <Header>
                        <ThemeChange theme={theme} setTheme={setTheme}/>
                        <Span>Your profile</Span>
                        <ProfileBurger />
                    </Header>
                    <ProfileDiv>
                        <Ul>
                            <li key='email'>E-Mail: {profile?.email}</li>
                            {profile?.age ? ( <li key='age'>AGE: {profile.age}</li>
                        ) : (
                            <li>age not specified</li>
                        )}
                            <li key='registerTime'>CreatedAt: {profile?.createdAt && new Date(profile.createdAt).toLocaleString()}</li>
                        </Ul>
                    </ProfileDiv>
                    <ChangePassDiv>
                    <ErrorSpan>{message}</ErrorSpan>    
                        <InputsDiv>
                            <div>
                                <PassP>Old password</PassP>
                                <CustomInput 
                                name="oldPass"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <PassP>New password</PassP>
                                <CustomInput 
                                name="newPass"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <PassP>Again new password</PassP>
                                <CustomInput 
                                onPaste={handlePaste}
                                name="newPass"
                                value={newPasswordAgain}
                                onChange={(e) => setNewPasswordAgain(e.target.value)}
                                />
                            </div>
                        </InputsDiv>
                        <ChangePassBtn onClick={handlePassChangeClick}>Change password</ChangePassBtn>
                    </ChangePassDiv>
                </Container>
            </>
        )}
    </>
    )
}