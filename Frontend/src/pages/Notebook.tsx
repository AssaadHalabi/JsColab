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
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    if (!notebook_id) {
      navigate("/notebooks");
    }
    const fetchNotebookAndPopulateLocalStorage = async () => {
      let result = await fetchNotebook(notebook_id || "");
      setNotebook(result);
    };
    fetchNotebookAndPopulateLocalStorage();
  }, [loading]);

  return (
    <div>
      {notebook ? <CellList notebook={notebook} user={user} /> : <h1>No notebook found</h1>}
    </div>
  );
};
