import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="container mt-5">
            <h1>Inicia Sesión</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                <p className = "text-center mt-3">
                    ¿No tienes cuenta? { " "}
                    <Link to = "/signup">Regístrate</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;