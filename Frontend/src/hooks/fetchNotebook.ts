import axios from "axios";
import { Notebook } from "../state/notebook";

export const fetchNotebookFromLocalStorage = (notebook_id: string) => {
  let notebook: Notebook = JSON.parse(
    localStorage.getItem(`notebook_${notebook_id}`) as string
  );
  // if (!notebook) {
  //   return;
  // }
  if (notebook) {
    notebook.cells = JSON.parse(JSON.stringify(notebook.cells));
  }

  return notebook;
};
export const fetchNotebook = async (notebook_id: string) => {
  // let notebook: Notebook | null = JSON.parse(
  //   localStorage.getItem(`notebook_${notebook_id}`) as string
  // );
  let notebook;

  let { data } = await axios.get(`${process.env.REACT_APP_API_URL}/notebook`, {
    params: { id: notebook_id },
  });
  notebook = data;
  localStorage.setItem(`notebook_${notebook_id}`, JSON.stringify(notebook));
  localStorage.setItem("notebook_id", notebook_id);

  return notebook as Notebook;
};
