import "../../css/editors/cell-list-item.css";
import { Cell } from "../../state";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
import ActionBar from "./action-bar";
import { Notebook } from "../../state/notebook";

interface CellListItemProps {
  cell: Cell;
  user: any
  notebook:Notebook;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell, user, notebook }) => {
  let child: JSX.Element;
  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.uuid} user={user} notebook={notebook} />
        </div>
        <CodeCell cell={cell} user={user} notebook={notebook}/>
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} user={user} notebook={notebook}/>
        <ActionBar id={cell.uuid} user={user} notebook={notebook}/>
      </>
    );
  }

  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
