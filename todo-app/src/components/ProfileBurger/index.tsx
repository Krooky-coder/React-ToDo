import { useState } from "react";
import { BURGER_ICON, PROFILE_ICON, LOGOUT_ICON, TasksIconPaths } from "../../assets/icons";
import { Container, ProfileBtn, ProfileIcon, ProfileNav } from "./style";
import { useDispatch } from "react-redux";
import useLocalStorage from "../../utils/localStorage";
import { logoutUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function ProfileBurger() {
    const [isOpen, setIsOpen] = useState(false);
    
    const {removeValue: removeAccessToken } = useLocalStorage(`Access Token`, '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickLogout = () => {
        removeAccessToken(`Access Token`);
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
    )
}

