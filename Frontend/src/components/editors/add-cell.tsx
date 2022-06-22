import '../../css/editors/add-cell.css';
import { useActions } from '../../hooks/use-actions';
import { Notebook } from '../../state/notebook';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
  user:any;
  notebook:Notebook;

}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId, user, notebook }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => user.email === notebook.owner_email && insertCellAfter(previousCellId, 'code')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => user.email === notebook.owner_email && insertCellAfter(previousCellId, 'text')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
