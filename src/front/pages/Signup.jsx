import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Signup = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const signup = async () => {
        if (user.password !== user.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const { confirmPassword, ...userToSend } = user;

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSend)
        };

        const backendUrl = import.meta.env.VITE_BACKEND_URL

        try {

            const response = await fetch(backendUrl + "/api/signup", fetchOptions);

            const data = await response.json();

            if (!response.ok) {
                alert(data.msg);
                return;
            }

            alert("Usuario registrado correctamente.");
            navigate("/login");
            
        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor.");
        }
    }

    return (
        <div className="row row-signup">
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center col-signup-card">
                <div className="signup-form">
                    <h2 className="mb-4 fw-bold">
                        Crea tu Cuenta
                    </h2>
                    <form >
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" value={user.firstname} onChange={(e) => setUser({ ...user, firstname: e.target.value })} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Apellido</label>
                                <input type="text" className="form-control" value={user.lastname} onChange={(e) => setUser({ ...user, lastname: e.target.value })} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Confirma tu Contraseña</label>
                            <input type="password" className="form-control" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); signup(); }}> Regístrate</button>
                    </form>
                </div>
            </div>
        </div>
    );
};