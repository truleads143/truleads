import AuthErrorPage from "./Employee_verification_error.jsx";
import Loading from "./Employee_verification_loading.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


import { login as authLogin } from "../../store/slices.js";

export default function TokenVerifier() {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState(null);

    const URL = import.meta.env.VITE_API_URL;

    const dispatch = useDispatch();
    //   const employee = useSelector((state) => state.auth.employeeInfo);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await axios.get(`${URL}/api/employee/verify-token`, {
                    withCredentials: true,
                });

                if (res.data?.success) {
                    dispatch(authLogin(res.data.employee));
                    setAuthorized(true);
                }
            } catch (err) {
                setAuthorized(false);

                if (Array.isArray(err?.response?.data?.errors)) {
                    setError(err.response.data.errors);
                } else if (err?.response?.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Session expired. Please login again.");
                }
            }
            finally {
                setTimeout(() => setLoading(false), 250);
            }
        };

        verifyToken();
    }, [dispatch]);

    if (loading) return (
        <div className="h-full">
            <Loading />
        </div>
    );

    if (!authorized) return <AuthErrorPage error={error} />;


    return <Outlet />;
}