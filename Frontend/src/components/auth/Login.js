import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
} from "../../firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import "../../css/auth/Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useActions } from "../../hooks/use-actions";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { Navbar } from "../Navbar";
function Login() {
  const userEmail = useTypedSelector((state) => state.user.email);
  const {referrer} = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const {loginUser} = useActions();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      console.log('success');
      const fn = async ()=>{
        await loginUser(user.email);
        console.log(`referrer: ${referrer}`);
        
        if(referrer) navigate(`/${atob(referrer)}`);
        else navigate("/dashboard")
      }
      fn();
      
    };
  }, [user, loading]);
  return (

    <>
    <Navbar />
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Login so you can create and edit JS notebooks</p>
          <button className="delete" aria-label="close" />
        </header>
        <section className="modal-card-body">
        <div className="login__container">
       <button className="login__btn button is-primary" onClick={signInWithGoogle}>
         Login with Google
       </button>
       <div>
         <Link to="/reset" className="has-text-primary">Forgot Password</Link>
       </div>
       <div>
         Don't have an account? <Link to="/register" className="has-text-primary">Register</Link> now.
       </div>
     </div>
        </section>
        <footer className="modal-card-foot">
          <a className="button is-primary" href="/createNotebook">
            New Notebook
          </a>
          <a className="button" href={user ? `/notebooks` : `/login`}>
            Cancel
          </a>
        </footer>
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
