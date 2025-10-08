import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
    return localStorage.getItem("auth") === "true";
};

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />
    }
    return children;
}

export default ProtectedRoute;