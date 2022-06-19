import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../../css/auth/Dashboard.css";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useActions } from "../../hooks/use-actions";
import { useTypedSelector } from "../../hooks/use-typed-selector";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const userEmail = useTypedSelector((state) => state.user.email);
  
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { logoutUser } = useActions();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="dashboard">
      <h1><a className="button is-primary" href="/notebooks">Notebooks</a></h1>
      <h1>{userEmail}</h1>
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button
          className="dashboard__btn"
          onClick={(e) => {
            logoutUser();
            logout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
