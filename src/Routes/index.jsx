import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({children}) => {
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [])

    return children;
}

export const PublicRoute = ({children}) => {
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [])

    return children;
}