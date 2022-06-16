import "bulmaswatch/superhero/bulmaswatch.min.css";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import CellList from "../components/editors/cell-list";
import { auth } from "../firebase";
import { fetchNotebook } from "../hooks/fetchNotebook";
import { Notebook } from "../state/notebook";
import { getNotebooks } from "../utils/getNotebooks";

export const Notebooks: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const DeleteNotebook = async (notebook_id: string) => {
    const notebook = await fetchNotebook(notebook_id);
    const payload = { ...notebook, user_email: user?.email };
    try {
      if (user && user.email === notebook.owner_email) {
        await axios.delete(`/deleteNotebook`, {
          data: payload,
        });
        setStatus(`Notebook ${notebook.name} has been deleted successfully`);
        setNotebooks(notebooks.filter((n) => n.id !== notebook_id));
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  useEffect(() => {
    const fetchNotebooks = async () => {
      if (loading) return;
      if (user && user.email) {
        let result = await getNotebooks(user.email);
        setNotebooks(result || []);
      } else {
        navigate("/login");
      }
    };
    fetchNotebooks();
  }, [user?.email]);

  const renderedNotebooks = notebooks.map((notebook) => (
    <tr key={notebook.id}>
      <Link to={`/notebook/${notebook.id}`}>
        <th>{notebook.name}</th>
        <td>{notebook.created}</td>
      </Link>
      <button
        className="delete"
        onClick={(e) => DeleteNotebook(notebook.id)}
      ></button>
    </tr>
  ));
  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Your JSColab Notebook</p>
          <button className="delete" aria-label="close" />
        </header>
        <section className="modal-card-body">
          {notebooks.length === 0 ? (
            <h1>You have no JSColab Notebooks yet</h1>
          ) : (
            <table className="table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Notebook Name</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>{notebooks && user && renderedNotebooks}</tbody>
            </table>
          )}
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
  );
};
