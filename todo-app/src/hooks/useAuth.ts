import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { fetchProfile } from "../api/auth";
import useLocalStorage from "./useLocalStorage";
import { TokenIsExpired } from "./useRefreshToken";
import { fetchRefresh } from "../api/auth";

export default function useAuth(): { isAuth: boolean; loading: boolean } {
    const hasRunRef = useRef(false)
    const dispatch = useAppDispatch();
    const { 
        initialValue: accessToken, 
        setStoredValue: storeAccessToken,
        removeValue: removeAccessToken
    } = useLocalStorage('Access Token', 'biliboba');
    const { 
        initialValue: refreshToken, 
        setStoredValue: storeRefreshToken,
        removeValue: removeRefreshToken
    } = useLocalStorage('Refresh Token', '');
    
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAndRefreshToken = async () => {
        if (!accessToken && !refreshToken) {
            setIsAuth(false);
            return null;
        }

        if(!TokenIsExpired(accessToken)) {
            return accessToken;
        }

        if (refreshToken) {
            const result = await dispatch(fetchRefresh({ refreshToken }));
            if (fetchRefresh.fulfilled.match(result)) {
                storeRefreshToken(result.payload.refreshToken);
                storeAccessToken(result.payload.accessToken);
                return result.payload.accessToken;
            }
        }
        removeAccessToken();
        removeRefreshToken();
        setIsAuth(false);
        return null
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