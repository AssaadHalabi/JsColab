import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Notebook } from "../state/notebook";

export const CreateNotebook: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");

  const errRef = useRef("");

  const navigate = useNavigate();

  const SaveEmptyNotebook = async () => {

    if (!user || !user.email) {
      return;
    }
    let payload = {
      cells: [],
      name,
      owner_email: user.email,
    };
    try {
      let { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/createNotebook`,
        payload
      );
      const notebook:Notebook = data;
      
      localStorage.setItem(`notebook_${notebook.id}`, JSON.stringify(notebook));
      navigate(`/notebook/${notebook.id}`);
    } catch (error: any) {
      errRef.current = error.message;
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [loading]);

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create JSColab Notebook</p>
          <button className="delete" aria-label="close" />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Notebook Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="My website prototype.."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={SaveEmptyNotebook}>
            Save Changes
          </button>
          <a
            className="button"
            href={user ? `/notebooks` : `/login`}
          >
            Cancel
          </a>
        </footer>
      </div>
    </div>
  );
};
