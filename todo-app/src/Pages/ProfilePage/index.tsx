import { useState } from "react";
import { useAppSelector } from "../../utils/useAppSeleсtor"
import { ChangePass } from "../../api/auth";
import useLocalStorage from "../../utils/localStorage";
import { Container, Header, ErrorSpan, ProfileDiv, Span, Ul, InputsDiv, ChangePassDiv, ChangePassBtn, PassP, CustomInput } from "./style";
import ProfileBurger from "../../components/ProfileBurger";
import { useAppDispatch } from "../../utils/useAppDispatch";

export const ProfilePage = () => {
    const { initialValue: accessToken} = useLocalStorage<string>('Access Token', '');

    const profile = useAppSelector(state => state.auth.user);
    const loadingStatus = useAppSelector((state) => state.todos.onLoading);
    const status = useAppSelector(state => state.auth.status);
    const erroeMessage = useAppSelector(state => state.auth.errorMessage);
    const dispatch = useAppDispatch();

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [newPasswordAgain, setNewPasswordAgain] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const clearAllForms = () => {
        setOldPassword('');
        setNewPassword('');
        setNewPasswordAgain('');
    }

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

    return (
    <>  
        {loadingStatus ? (
            <span>loading...</span>
            ) : ( 
                <>
                <Container>
                    <Header>
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
                                type="password" 
                                name="oldPass"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <PassP>New password</PassP>
                                <CustomInput 
                                type="password"
                                name="newPass"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <PassP>Again new password</PassP>
                                <CustomInput 
                                onPaste={(e) => e.preventDefault()}
                                type="password"
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