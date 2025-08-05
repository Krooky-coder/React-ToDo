import { type ReactNode } from "react"
import { Navigate } from 'react-router-dom';
import useAuth from "../../utils/useAuth";

interface Props {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const {isAuth, loading} = useAuth();

    return (
        <>
            {isAuth ? (
                children
            ) : ( 
                loading ? (
                    <div>loading</div>
                ) : (
                    <Navigate to="/login" replace />
                )
            )}
        </>
    )
}
