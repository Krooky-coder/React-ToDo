import { useState } from "react";
import { BURGER_ICON, PROFILE_ICON, LOGOUT_ICON, TasksIconPaths } from "../../assets/icons";
import { Container, ProfileBtn, ProfileIcon, ProfileNav } from "./style";
import useLocalStorage from "../../utils/localStorage";
import { logoutUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../utils/useAppDispatch";

export default function ProfileBurger() {
    const [isOpen, setIsOpen] = useState(false);
    
    const {removeValue: removeAccessToken } = useLocalStorage<string>(`Access Token`, '');
    const {removeValue: removeRefreshToken } = useLocalStorage<string>(`Refresh Token`, '');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClickLogout = (): void => {
        removeAccessToken();
        removeRefreshToken();
        dispatch(logoutUser());
        setIsOpen(false);
        navigate("/login", {replace: true});
    };

    return (
        <Container>
            <ProfileBtn onClick={() => setIsOpen(!isOpen)}>
                <ProfileIcon>
                    { BURGER_ICON }
                </ProfileIcon>
            </ProfileBtn>
            {isOpen &&
                <>
                    <ProfileNav to='/'>
                        <ProfileIcon>
                            <TasksIconPaths />
                        </ProfileIcon>
                    </ProfileNav>
                    <ProfileNav to='/profile'>
                        <ProfileIcon>
                            { PROFILE_ICON }
                        </ProfileIcon>
                    </ProfileNav>
                    <ProfileBtn onClick={handleClickLogout}>
                        <ProfileIcon>
                            { LOGOUT_ICON }
                        </ProfileIcon>
                    </ProfileBtn>
                </>
            }
        </Container>
    );
};

