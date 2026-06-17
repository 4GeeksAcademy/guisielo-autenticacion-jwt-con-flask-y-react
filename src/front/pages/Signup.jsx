import { Link } from "react-router-dom"

const Signup = () => {
    return (
        <div className="container mt-5">
            <h1>Regístrate</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                    <input type="password" className="form-control" id="confirmPassword" />
                </div>
                <button type="submit" className="btn btn-primary">Regístrate</button>
                <p className="text-center mt-3">
                    ¿Ya tienes cuenta? {" "}
                    <Link to="/login">Inicia Sesión</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;