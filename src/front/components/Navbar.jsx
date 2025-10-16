import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar bg-light-subtle">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Auth Test</span>
				</Link>
			</div>
		</nav>
	);
};