import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Login = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const login = async () => {
        setLoading(true);

        try {

            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)

            };


            const backendUrl = import.meta.env.VITE_BACKEND_URL

            const response = await fetch(backendUrl + "/api/login", fetchOptions)

            const data = await response.json();

            if (!response.ok) {
                alert(data.msg || "Error al iniciar sesión");
                return;
            }

            if (!data.access_token || !data.user) {
                alert("Respuesta inválida del servidor");
                return;
            }

            localStorage.setItem("token", data.access_token);

            localStorage.setItem("user", JSON.stringify(data.user));

            dispatch({
                type: "set_user",
                payload: data.user,
            });

            dispatch({
                type: "set_token",
                payload: data.access_token,
            });

            navigate("/private");

        }

        catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor");
        }

        finally {

            setLoading(false);

        }
    };

    return (
        <div className="row row-login">
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center col-login-card">
                <div className="login-form">
                    <h2 className="mb-4 fw-bold">
                        Inicia Sesión
                    </h2>
                    <form onSubmit={(e) => { e.preventDefault(); login(); }}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-3 mb-4 small-links">
                            <Link to="/signup" className="forgot-password-link">
                                Regístrate
                            </Link>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}> {loading ? "Ingresando..." : "Inicia Sesión"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};