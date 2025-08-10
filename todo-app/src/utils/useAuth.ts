import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { fetchProfile } from "../api/auth";
import useLocalStorage from "./localStorage";
import { TokenIsExpired } from "./RefreshToken";
import { fetchRefresh } from "../api/auth";

export default function useAuth(): { isAuth: boolean; loading: boolean } {
    const hasRunRef = useRef(false)
    const dispatch = useAppDispatch();
    const { 
        initialValue: accessToken, 
        setStoredValue: storeAccessToken,
    } = useLocalStorage('Access Token', 'biliboba');
    const { 
        initialValue: refreshToken, 
        setStoredValue: storeRefreshToken,
    } = useLocalStorage('Refresh Token', '');
    
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAndRefreshToken = async () => {
        if (!accessToken && !refreshToken) {
            setIsAuth(false);
            return null;
        }

        if (TokenIsExpired(accessToken) && refreshToken) {
            const result = await dispatch(fetchRefresh({ refreshToken }));
            if (fetchRefresh.fulfilled.match(result)) {
                storeRefreshToken(result.payload.refreshToken);
                storeAccessToken(result.payload.accessToken);
                return result.payload.accessToken;
            }
        }
        return accessToken;
    };

    const checkAuth = async () => {
        setLoading(true);
        try {
            const validToken = await checkAndRefreshToken();

            if (!validToken) {
                setIsAuth(false);
                return;
            }

            const profileResult = await dispatch(fetchProfile({ accessToken: validToken }));
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
        if (hasRunRef.current) return;
        hasRunRef.current = true;

        checkAuth();

        const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'Access Token') {
            checkAuth();
        }};

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return { isAuth, loading };
}