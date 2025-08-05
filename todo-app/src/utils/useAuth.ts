import { useEffect, useState } from "react";
import { useAppDispath } from "./useAppDispatch";
import { fetchProfile } from "../api/auth";
import useLocalStorage from "./localStorage";

export default function useAuth(): {isAuth: boolean, loading: boolean} {
    
    const { initialValue: accessToken } = useLocalStorage('Access Token', '');
    const dispatch = useAppDispath();
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const checkAuth = async () => {
        setLoading(true);
        try {
            const result = await dispatch(fetchProfile({ accessToken }));
            if (fetchProfile.fulfilled.match(result)) {
                setIsAuth(true);
                setLoading(false);
            }
            if (fetchProfile.rejected.match(result)) {
                throw new Error;
            }
            
        } catch (err) {
            console.log(err)
            setIsAuth(false);
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth()
    },[])
    
    return {isAuth, loading};
}
