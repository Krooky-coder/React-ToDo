import { type ReactNode } from "react"
import { Navigate } from 'react-router-dom';
import useLocalStorage from "../../utils/localStorage";

interface Props {
    children: ReactNode;
}

export default function ProtectedRoute ({ children }:Props) {
    const { initialValue: isAuth } = useLocalStorage('IsAuth', false);

    return <>
        {isAuth ? (
            children
        ) : (
            <>
                <Navigate to="/login" replace />
            </>
        )} 
    </>
}