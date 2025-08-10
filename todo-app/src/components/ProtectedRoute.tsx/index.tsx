import { type ReactNode } from "react"
import { Navigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

interface Props {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const {isAuth, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}