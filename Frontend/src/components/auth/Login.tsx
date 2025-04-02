import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/auth/Login.css";
import { auth, signInWithGoogle } from "../../firebase";
import { useActions } from "../../hooks/use-actions";
import { Navbar } from "../Navbar";
import axios from "axios";
function Login() {
  // const userEmail = useTypedSelector((state) => state.user.email);
  const { referrer } = useParams();
  const [user, loading, error] = useAuthState(auth);
  const { loginUser } = useActions();
  const navigate = useNavigate();
  useEffect(() => {
    // if (loading) {
    //   // maybe trigger a loading screen
    //   return;
    // }
    if (user) {
      console.log("success");
      const fn = async () => {
        let { data: { exists } } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`, {
          params: { email: user.email },
        });
        console.log(`login middle, user exists: ${exists}`);
        if (!exists)
          try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
              email: user.email,
            });
            console.log(res);
            
          } catch (error:any) {
            console.error(error)
          }
        console.log(`login created new user ${user.email} end`);
        await loginUser(user.email as string);
        console.log(`referrer: ${referrer}`);
        if (referrer) navigate(`/${atob(referrer)}`);
        else navigate("/");
      };
      try {
        fn();
      } catch (error: any) {
        console.log(error.message);
      }
    } else if(error !== undefined) {
      console.log("error");
      console.log(JSON.stringify(error));
    }
  }, [user, loading]);
  return (
    <>
      <Navbar />
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              Login so you can create and edit JS notebooks
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={(e) => navigate(-1)}
            />
          </header>
          <section className="modal-card-body">
            <div className="login__container">
              <button
                className="login__btn button is-primary"
                onClick={async () => {
                  console.log("signInWithGoogle started");
                  await signInWithGoogle();
                }}
              >
                Login with Google
              </button>
            </div>
          </section>
          <footer className="modal-card-foot"></footer>
        </div>
      </div>
    </>

    // <div className="login">
    //   <div className="login__container">
    //     <button className="login__btn login__google" onClick={signInWithGoogle}>
    //       Login with Google
    //     </button>
    //     <div>
    //       <Link to="/reset">Forgot Password</Link>
    //     </div>
    //     <div>
    //       Don't have an account? <Link to="/register">Register</Link> now.
    //     </div>
    //   </div>
    // </div>
  );
}
export default Login;
