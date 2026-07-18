import { Navigate } from "react-router-dom";

export const Private = () => {

    const token = sessionStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container mt-5">
            <h1>ÁREA RESTRINGIDA SOLO PARA USUARIOS AUTENTICADOS</h1>
        </div>
    );
};