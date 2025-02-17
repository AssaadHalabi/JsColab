import { CircularProgress, Grid, Snackbar } from "@material-ui/core";
import axios from "axios";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "../css/editors/code-cell.css";
import "../css/editors/notebooks.css";
import { auth } from "../firebase";
import { fetchNotebook } from "../hooks/fetchNotebook";
import { Notebook } from "../state/notebook";
import { getNotebooks } from "../utils/getNotebooks";

export const Notebooks: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const navigate = useNavigate();
  const [loadingStatus, setLoading] = useState(loading);
  const [status, setStatus] = useState("Request failed");
  const [open, setopen] = useState(false);
  const [error, setError] = useState("");

  const DeleteNotebook = async (notebook_id: string) => {
    const notebook = await fetchNotebook(notebook_id);
    const payload = { notebook, user_email: user?.email };
    try {
      if (user && user.email === notebook.owner_email) {
        const result = await axios.delete(`/api/deleteNotebook`, {
          data: payload,
        });
        console.log(notebook);
        if (result)
          setStatus(`Notebook ${notebook.name} has been deleted successfully`);
        setopen(true);
        setNotebooks(notebooks.filter((n) => n.id !== notebook_id));
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleClick = () => setopen(false);

  useEffect(() => {
    const fetchNotebooks = async () => {
      if (loading) return;
      if (user && user.email) {
        try {
          let result = await getNotebooks(user.email);
          console.log(result);

          setNotebooks(result || []);
          setLoading(false);
          setStatus("");
        } catch (err: any) {
          setLoading(false);
          setError(err.message);
        }
      } else if (!loading) {
        navigate(`/login/${btoa(window.location.pathname.slice(1))}`);
      }
    };
    fetchNotebooks();
  }, [user, loading]);

  const renderedNotebooks = notebooks.map((notebook) => (
    <tr key={notebook.id}>
      <td>
        <h1 className="is-size-4">
          <a className="rowlink" href={`/notebook/${notebook.id}`}>
            {notebook.name}
          </a>
        </h1>
      </td>
      <td>
        <h1 className="is-size-4">
          {new Date(notebook.created).toDateString()}
        </h1>
      </td>
      <td style={{ width: "0.1%", whiteSpace: "nowrap" }}>
        <button
          onClick={(event) => {
            if (window.confirm("Want to delete?")) DeleteNotebook(notebook.id);
          }}
          className="delete"
        />
      </td>
    </tr>
  ));

  const emptyNotebooksCondition =
    notebooks.length === 0 &&
    !loading &&
    !error &&
    !(status === "Request failed");
  const notebooksNotEmptyCondition = notebooks.length > 0 && !loading && !error;
  return (
    <>
      <Navbar />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClick={handleClick}
        open={open}
        // onClose={handleClose}
        message={status}
        key={"top center"}
      />
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Your JSColab Notebook</p>
            <button
              className="delete"
              aria-label="close"
              onClick={(e) => navigate("/")}
            />
          </header>
          <section className="modal-card-body">
          {loadingStatus && (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
    <CircularProgress size={50} />
  </div>
)}
            {error && error !== "request failed" && (
              <div
                style={{
                  fontSize: "2em",
                  fontFamily: "sans-serif",
                  color: "rgb(206, 17, 38)",
                  whiteSpace: "pre-wrap",
                  margin: "0px 2rem 0.75rem 0px",
                  flex: "0 0 auto",
                  overflow: "auto",
                }}
              >
                {error}
              </div>
            )}
            {emptyNotebooksCondition && (
              <h1>You have no JSColab Notebooks yet</h1>
            )}
            {notebooksNotEmptyCondition && (
              <table className="table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Notebook Name</th>
                    <th>Date Created</th>
                    <th style={{ width: "0.1%", whiteSpace: "nowrap" }}>
                      Action
                    </th>
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
          </footer>
        </div>
      </div>
    </>
  );
};
