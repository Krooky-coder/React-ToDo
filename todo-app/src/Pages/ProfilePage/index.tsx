import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSeleсtor"
import { ChangePass } from "../../api/auth";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Container, Header, ErrorSpan, ProfileDiv, Span, Ul, InputsDiv, ChangePassDiv, ChangePassBtn, PassP, CustomInput } from "./style";
import ProfileBurger from "../../components/ProfileBurger";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import useAuth from "../../hooks/useAuth";

interface passParams {
    oldPassword: string;
    newPassword: string;
    newPasswordAgain: string;
}

export const ProfilePage = () => {
    const { initialValue: accessToken} = useLocalStorage<string>('Access Token', '');

    const profile = useAppSelector(state => state.auth.user);
    const loadingStatus = useAppSelector((state) => state.todos.onLoading);
    const erroeMessage = useAppSelector(state => state.auth.errorMessage);
    const dispatch = useAppDispatch();

    const [passObj, setPassObj] = useState<passParams>({
        oldPassword:'',
        newPassword: '',
        newPasswordAgain: '',
    });
    const [message, setMessage] = useState<string>('');
    const { isAuth } = useAuth();

    useEffect(() => {

    },[isAuth])

    const clearAllForms = () => {
        setPassObj({
        oldPassword:'',
        newPassword: '',
        newPasswordAgain: '',
        })
    }

    const handlePassChangeClick = async () => {
        const { oldPassword, newPassword, newPasswordAgain } = passObj
        if (erroeMessage === 'Ошибка сервера') {
            setMessage('Ошибка сервера');
            return;
        }
        if (newPassword.length < 6) {
            setMessage('new password too short');
            clearAllForms();
            return;
        }
        if (newPassword !== newPasswordAgain) {
            setMessage(`New password's are different`);
            clearAllForms();
            return;
        }

        const result = await dispatch(ChangePass({ oldPassword, newPassword, accessToken }));
        if (ChangePass.rejected.match(result)) {
            if (result.payload) {
                setMessage(result.payload);
            }
            return;
        }
        setMessage(`password changed successfully`)
        clearAllForms();
        }

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value} = e.target;
            setPassObj(prev => ({
                ...prev,
                [name]: value,
            }))
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
                                name="oldPassword"
                                value={passObj.oldPassword}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <PassP>New password</PassP>
                                <CustomInput 
                                type="password"
                                name="newPassword"
                                value={passObj.newPassword}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <PassP>Again new password</PassP>
                                <CustomInput 
                                onPaste={(e) => e.preventDefault()}
                                type="password"
                                name="newPasswordAgain"
                                value={passObj.newPasswordAgain}
                                onChange={handleInputChange}
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