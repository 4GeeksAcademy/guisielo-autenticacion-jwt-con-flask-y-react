import { Link, NavLink } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();

	const token = store.token;

	console.log(token)

	const logout = () => {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user");

		dispatch({
			type: "set_token",
			payload: null,
		});

		dispatch({
			type: "set_user",
			payload: null,
		});
	};

	console.log(token)

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{token ? (

						<NavLink to="/login" className="btn btn-login" onClick={logout}>
							<span>Cerrar sesión</span>
						</NavLink>

					) : (

						<NavLink to="/login" className="btn btn-login">
							<i className="fa-brands fa-expeditedssl"></i>
							<span>Inicia sesión</span>
						</NavLink>

					)
					}

				</div>
			</div >
		</nav >
	);
};