import { useEffect, useState } from "react";
import useLocalStorage from "./localStorage";
import { useAppSelector } from "./useAppSeleсtor";
import { TokenIsExpired } from "./RefreshToken";
import { useAppDispatch } from "./useAppDispatch";
import { fetchRefresh } from "../api/auth";
import { current } from "@reduxjs/toolkit";

export default function useRefreshToken() {
    const { initialValue: accessToken, setStoredValue: storeAccessToken } = useLocalStorage<string>('Access Token', '');
    const { initialValue: refreshToken, setStoredValue: storeRefreshToken } = useLocalStorage<string>('Refresh Token', '');
    const dispatch = useAppDispatch();
    const [currentToken, setCurrentToken] = useState(accessToken);
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    useEffect(() => {
        const checkAndRefreshToken = async () => {
            if (isRefreshing) return;
             setIsRefreshing(true);
            if (!refreshToken) return;

            if (TokenIsExpired(currentToken)) {
                try {
                    const result = await dispatch(fetchRefresh({ refreshToken }));
                    
                    if (fetchRefresh.fulfilled.match(result)) {
                        const newAccessToken = result.payload.accessToken;
                        storeAccessToken(newAccessToken);
                        setCurrentToken(newAccessToken);
                        
                    }
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                    // Очищаем токены в случае ошибки
                    storeAccessToken('');
                    storeRefreshToken('');
                    setCurrentToken('');
                }   finally {
                    setIsRefreshing(false);
                }
            }
        };

        checkAndRefreshToken();
    }, [accessToken, refreshToken, dispatch]);

    return {
        currentToken,
        refreshToken: async () => {
            if (!refreshToken) return '';
            const result = await dispatch(fetchRefresh({ refreshToken }));
            if (fetchRefresh.fulfilled.match(result)) {
                const newToken = result.payload.accessToken;
                storeAccessToken(newToken);
                setCurrentToken(newToken);
                return newToken;
            }
            return '';
        }
    };
}