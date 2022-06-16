import '../../css/editors/action-bar.css';
import { useNotebookFromLocalStorage } from '../../hooks/fetchNotebook';
import { useActions } from '../../hooks/use-actions';
import { Notebook } from '../../state/notebook';

interface ActionBarProps {
  id: string;
  user:any;
  notebook:Notebook;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, user, notebook }) => {
  const { moveCell, deleteCell } = useActions();


  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => user.email === notebook.owner_email && moveCell(id, 'up')}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => user.email === notebook.owner_email && moveCell(id, 'down')}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => user.email === notebook.owner_email && deleteCell(id)}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
