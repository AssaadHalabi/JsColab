import '../../css/editors/code-cell.css';
import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useCumulativeCode } from '../../hooks/use-cumulative-code';
import { Notebook } from '../../state/notebook';

interface CodeCellProps {
  cell: Cell;
  user: any;
  notebook:Notebook;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell, user, notebook }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.uuid]);
  const cumulativeCode = useCumulativeCode(cell.uuid);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.uuid, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.uuid, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.uuid, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => user.email === notebook.owner_email && updateCell(cell.uuid, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
