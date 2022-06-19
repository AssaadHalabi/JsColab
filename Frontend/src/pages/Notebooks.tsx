import "bulmaswatch/superhero/bulmaswatch.min.css";
import "../css/editors/code-cell.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import CellList from "../components/editors/cell-list";
import { auth } from "../firebase";
import { fetchNotebook } from "../hooks/fetchNotebook";
import { Notebook } from "../state/notebook";
import { getNotebooks } from "../utils/getNotebooks";
import { CircularProgress, Grid } from "@material-ui/core";
import { Navbar } from "../components/Navbar";
import { Modal } from "../components/Modal";

export const Notebooks: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const navigate = useNavigate();
  const [loadingStatus, setLoading] = useState(loading);
  const [status, setStatus] = useState("Request failed");
  const [error, setError] = useState("");
  const [openModal, setopenModal] = useState(false);

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
    } catch (err: any) {
      setError(err.message);
    }
  };
  useEffect(() => {
    const fetchNotebooks = async () => {
      // if (loading) return;
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
  }, [user?.email, loading]);

  const renderedNotebooks = notebooks.map((notebook) => (
    <>
      <Link
        to={`/notebook/${notebook.id}`}
        style={{ display: "table-row" }}
        key={notebook.id}
      >
        <td>
          <h1 className="is-size-4">{notebook.name}</h1>
        </td>
        <td>
          <h1 className="is-size-4">
            {new Date(notebook.created).toDateString()}
          </h1>
        </td>
      </Link>
    </>
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

      <Modal
        openModal={openModal}
        setopenModal={setopenModal}
        title={"Your JSColab Notebook"}
        footerContent={
          <>
            <a className="button is-primary" href="/createNotebook">
              New Notebook
            </a>
            <a className="button" href={user ? `/notebooks` : `/login`}>
              Cancel
            </a>
          </>
        }
      >
        {loadingStatus && (
          <Grid item>
            <CircularProgress variant="indeterminate" />
            Loading
          </Grid>
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
        {emptyNotebooksCondition && <h1>You have no JSColab Notebooks yet</h1>}
        {notebooksNotEmptyCondition && (
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
      </Modal>
    </>
  );
};
