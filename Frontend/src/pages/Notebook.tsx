import { Snackbar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import CellList from "../components/editors/cell-list";
import { Navbar } from "../components/Navbar";
import { auth } from "../firebase";
import { fetchNotebook } from "../hooks/fetchNotebook";
import { Notebook } from "../state/notebook";

export const NotebookPage: React.FC = () => {
  const { notebook_id } = useParams();
  const [notebook, setNotebook] = useState<Notebook>();
  const [open, setOpen] = useState(false);
  const [fetched, setfetched] = useState(false);
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (!user) navigate(`/login/${btoa(window.location.pathname.slice(1))}`);
    if (!notebook_id) {
      navigate("/notebooks");
    }
    const fetchNotebookAndPopulateLocalStorage = async () => {
      try {
        let result = await fetchNotebook(notebook_id || "");
        setNotebook(result);
        setfetched(true);
        if (user?.email !== result.owner_email) {
          setOpen(true);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchNotebookAndPopulateLocalStorage();
  }, [user, loading]);

  const handleClick = ()=>{
    setOpen(!open);
  }

  return (
    <div>
      <Navbar />
      <Snackbar
        anchorOrigin={{ vertical:'top' , horizontal:"center" }}
        onClick={handleClick}
        open={open}
        // onClose={handleClose}
        message= "Viewer Mode (Edit-mode is for the Notebook owner)"
        key={'top' + 'center'}
      />
      {notebook && !loading && fetched && (
        <CellList notebook={notebook} user={user} />
      )  }
      {!notebook && !loading && fetched && (
        <div
    style={{
    fontSize: "2em",
    fontFamily: "sans-serif",
    color: "rgb(206, 17, 38)",
    position:'absolute',
    left: `${window.screen.width * 0.35}px`,
    top: `${window.screen.height * 0.4}px`,
    whiteSpace: "pre-wrap",
    flex: "0 0 auto",
    maxHeight: "50%",
    overflow: "auto"
  }}
>
  No Notebook was found
</div>
      )}
    </div>
  );
};
