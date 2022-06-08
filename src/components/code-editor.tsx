import MonacoEditor, { OnChange, OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  setInputonChange(value: string) : void;
}

const CodeEditor : React.FC<CodeEditorProps> = ({setInputonChange, initialValue}) => {
  const onChange : OnChange = (code) =>{
      setInputonChange(code as string);
  }
  const onMount : OnMount = (editor) =>{
    editor.getModel()?.updateOptions({tabSize: 2});
}
  
  return (
    <MonacoEditor
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
  );
};

export default CodeEditor;
