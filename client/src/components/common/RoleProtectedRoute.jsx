import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RoleProtectedRoute = ({
    children,
    allowedRoles = [],
}) => {

    const { user, token, loading } = useAuth();

    // Wait until auth is loaded
    if (loading) {
        return null;
    }

    // Not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but role not allowed
    if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default RoleProtectedRoute;