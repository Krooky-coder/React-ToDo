import { useEffect, useState } from "react";
import { TokenIsExpired } from "./RefreshToken";
import { fetchRefresh } from "../api/auth";
import useLocalStorage from "./localStorage";


export default function useRefresh(): string {
    const { initialValue: accessToken, setStoredValue: storeAccessToken } = useLocalStorage('Access Token', '');
    const { initialValue: refreshToken, setStoredValue: storeRefreshToken } = useLocalStorage('Refresh Token', '');

    const [token, setToken] = useState(accessToken);
    const [refresh, setRefresh] = useState(refreshToken);

    useEffect(() => {
        const check = async () => {
            if (TokenIsExpired(token)) {
                const result = await fetchRefresh({ refreshToken: refresh });
                if (fetchRefresh.fulfilled.match(result)) {
                    setToken(result.payload.accessToken);
                    storeAccessToken(result.payload.accessToken);
                    setRefresh(result.payload.refreshToken);
                    storeRefreshToken(result.payload.refreshToken);
                }
            }
        }
        check()
    },[])


    return token;
}
