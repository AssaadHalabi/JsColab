import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

export const Navbar: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
  }, []);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
          <img
            src={`${process.env.PUBLIC_URL}/jscolab.PNG`}
            width={112}
            height={28}
          />
        </a>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">Home</a>
          <a className="navbar-item">Documentation</a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            {user ? (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link" style={{ color: "#F2D100" }}>
                  {user.email}
                </a>
                <div className="navbar-dropdown">
                  <a className="navbar-item">Logout</a>
                </div>
              </div>
            ) : (
              <div className="navbar-item">
                <div className="buttons">
                  <Link to={"/register"} className="button is-primary">
                    <strong>Sign up</strong>
                  </Link>
                  <Link to={"/login"} className="button is-light">
                    Log in
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
