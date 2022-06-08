import MonacoEditor, { OnChange, OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  setInputonChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  setInputonChange,
  initialValue,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const onChange: OnChange = (code) => {
    setInputonChange(code as string);
  };
  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current!.getModel()!.getValue();
    const formatted = prettier.format(unformatted, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    editorRef.current?.setValue(formatted);
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        language="javascript"
        onChange={onChange}
        onMount={onMount}
        value={initialValue}
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
        }}
        height="500px"
      />
    </div>
  );
};

export default CodeEditor;
