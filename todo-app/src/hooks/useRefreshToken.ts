import { jwtDecode } from 'jwt-decode';

export const TokenIsExpired = (token: string | null | undefined): boolean => {
    if (!token || token.split('.').length !== 3) {
        return true;
    }

    try {
        const decode = jwtDecode(token);
    
        if (!decode || typeof decode === 'string') {
            return false;      
        };
    
        if (decode.exp) {
            const CurrentTime = Math.floor(Date.now() / 1000)
            return decode.exp < CurrentTime;
        }
        return false;
    }   catch (error) {
        return true;
    }

}

