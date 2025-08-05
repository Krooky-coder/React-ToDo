import { jwtDecode } from 'jwt-decode';


export const TokenIsExpired = (token: string): boolean => {
    const decode = jwtDecode(token);

    if (!decode || typeof decode === 'string') {
        return false;      
    };

    if (decode.exp) {
        const CurrentTime = Math.floor(Date.now() / 1000)
        return decode.exp < CurrentTime;
    }
    return false;
}
