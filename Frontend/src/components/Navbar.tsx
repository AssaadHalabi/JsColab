import { CircularProgress, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, logout } from "../firebase";
import { logoutUser } from "../state/action-creators";
import "../css/Navbar.css";

export const Navbar: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [isActive, setisActive] = useState(false);
  useEffect(() => {
    if (loading) return;
  }, [user, loading]);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img
            src={`${process.env.PUBLIC_URL}/jscolab.PNG`}
            width={112}
            height={28}
          />
        </a>
        <a
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="true"
          data-target="navbarBasicExample"
          onClick={(e) => setisActive(!isActive)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <a className="navbar-item" href="/">
            Home
          </a>
          <a className="navbar-item" href="/help">
            Documentation
          </a>
          <a className="navbar-item grow" href="/createNotebook">
            Create A Notebook
          </a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown">
              <a
                className="navbar-item"
                href="https://github.com/AssaadHalabi/JsColab"
              >
                Report an issue
              </a>
              <a
                className="navbar-item"
                href="https://assaadportfolio.herokuapp.com"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            {loading && (
              <Grid item>
                <CircularProgress variant="indeterminate" />
                Loading
              </Grid>
            )}
            {user && !loading ? (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link" style={{ color: "#EFC901" }}>
                  {user.email}
                </a>
                <div className="navbar-dropdown">
                  <a
                    className="navbar-item is-size-6"
                    style={{ color: "#EFC901" }}
                    href="/notebooks"
                  >
                    My Notebooks
                  </a>
                  <a
                    className="navbar-item is-size-6"
                    onClick={(e) => {
                      logoutUser();
                      logout();
                    }}
                  >
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              !loading && (
                <div className="navbar-item">
                  <div className="buttons">
                    <Link to={"/login"} className="button is-primary">
                      Log in
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
