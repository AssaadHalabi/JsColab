import { Fragment, useEffect, useRef } from "react";
import "../../css/editors/cell-list.css";
import { useActions } from "../../hooks/use-actions";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { Notebook } from "../../state/notebook";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";

interface CellListProps {
  notebook: Notebook;
  user: any;
}

const CellList: React.FC<CellListProps> = ({ notebook, user }) => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );
  // const userEmail = useTypedSelector((state) => state.user.email);
  const { fetchCells } = useActions();
  const errRef = useRef("");
  errRef.current = "";
  useEffect(() => {
    if (!notebook) {
      errRef.current = "Notebook not found";
    }
    try {
      fetchCells(notebook.id);
      console.log('after fetch cells');
      console.log(`cells ${JSON.stringify(cells)}`);
      
    } catch (error: any) {
      errRef.current = error.message;
    }
  }, []);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.uuid}>
      <CellListItem cell={cell} user={user} notebook={notebook}/>
      <AddCell previousCellId={cell.uuid} user={user} notebook={notebook}/>
    </Fragment>
  ));

  const errorOutput =
    errRef.current === "Notebook not found" && user ? (
      <div className="modal">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Oops.. An Error has occurred</p>
            <button className="delete" aria-label="close" />
          </header>
          <section className="modal-card-body">{errRef.current}</section>
          <footer className="modal-card-foot">
            <a className="button is-primary" href="/createNotebook">
              Create Notebook
            </a>
            <a className="button is-secondary" href={`/notebooks`}>
              Your Notebooks
            </a>
          </footer>
        </div>
        : <div>{errRef.current}</div>
      </div>
    ) : (
      <>{errRef.current}</>
    );

  if (errRef.current) {
    return <>{errorOutput}</>;
  } else {
    return (
      <div className="cell-list">
        <AddCell forceVisible={cells.length === 0} previousCellId={null} user={user} notebook={notebook} />
        {renderedCells}
      </div>
    );
  }
};

export default CellList;
