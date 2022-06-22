import "../../css/editors/action-bar.css";
import { useActions } from "../../hooks/use-actions";
import { Notebook } from "../../state/notebook";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
interface ActionBarProps {
  id: string;
  user: any;
  notebook: Notebook;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, user, notebook }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() =>
          user.email === notebook.owner_email && moveCell(id, "up")
        }
      >
        {/* <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span> */}
        <ArrowUpwardRoundedIcon fontSize="small" />
      </button>
      <button
        className="button is-primary is-small"
        onClick={() =>
          user.email === notebook.owner_email && moveCell(id, "down")
        }
      >
        <ArrowDownwardRoundedIcon fontSize="small" />
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => user.email === notebook.owner_email && deleteCell(id)}
      >
        <ClearRoundedIcon fontSize="small" />
      </button>
    </div>
  );
};

export default ActionBar;
