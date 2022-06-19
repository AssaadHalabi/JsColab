import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";
import { Navbar } from "../components/Navbar";
import { auth } from "../firebase";
import { Notebook } from "../state/notebook";

export const CreateNotebook: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [openModal, setopenModal] = useState(false);
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
      const notebook: Notebook = data;

      localStorage.setItem(`notebook_${notebook.id}`, JSON.stringify(notebook));
      navigate(`/notebook/${notebook.id}`);
    } catch (error: any) {
      errRef.current = error.message;
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate(`/login/${btoa(window.location.pathname.slice(1))}`);
  }, [loading]);

  return (
    <>
      <Navbar />
      <Modal
        openModal={openModal}
        setopenModal={setopenModal}
        title={"Create JSColab Notebook"}
        footerContent={
          <>
            <button className="button is-success" onClick={SaveEmptyNotebook}>
              Save Changes
            </button>
            <a className="button" href={user ? `/notebooks` : `/login`}>
              Cancel
            </a>
          </>
        }
      >
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
      </Modal>

    
    </>
  );
};
