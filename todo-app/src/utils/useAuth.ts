import { useEffect, useState } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { fetchProfile, fetchRefresh } from "../api/auth";
import useLocalStorage from "./localStorage";
import { TokenIsExpired } from "./RefreshToken";
import useRefreshToken from "./useRefreshToken";

export default function useAuth(): { isAuth: boolean; loading: boolean } {
    const dispatch = useAppDispatch();
    const { currentToken } = useRefreshToken();
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        if (!currentToken) {
            setIsAuth(false);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const profileResult = await dispatch(fetchProfile({ accessToken: currentToken }));
            
            if (fetchProfile.fulfilled.match(profileResult)) {
                setIsAuth(true);
            } else {
                throw new Error('Failed to fetch profile');
            }
        } catch (err) {
            console.error('Authentication error:', err);
            setIsAuth(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [currentToken]); // Зависимость от currentToken

    return { isAuth, loading };
}