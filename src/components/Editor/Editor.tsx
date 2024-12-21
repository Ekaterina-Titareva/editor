import { FC, useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import mockServer from "../../api/mockServer";
import { MockServerResponse } from "../../types/mockServer";

import "./editor.css";

const Editor: FC = () => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState<string>("javascript");
  const monacoEl = useRef<HTMLDivElement | null>(null);
  const [result, setResult] = useState<string | undefined>("");

  useEffect(() => {
    if (monacoEl.current && !editor) {
      const newEditor = monaco.editor.create(monacoEl.current, {
        language: language,
      });
      setEditor(newEditor);
    }
    return () => {
      if (editor) {
        editor.dispose();
      }
    };
  }, [monacoEl.current]);

  useEffect(() => {
    if (editor) {
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language, editor]);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    setResult("");
  };

  const handleRun = async () => {
    if (editor) {
      const code = editor.getValue();
      const response: MockServerResponse = await mockServer(code, language);
      if (response.status === "success") {
        setResult(response.output);
      } else {
        setResult(response.error);
      }
    }
  };

  return (
    <div className="editor__container">
      <select
        className="language-select"
        title="language"
        onChange={handleLanguageChange}
        value={language}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
      <h3>Solution</h3>
      <div className="monaco-editor__wrapper" ref={monacoEl}></div>
      <button type="button" onClick={handleRun}>
        Run
      </button>
      <h3>Result</h3>
      <div className="result__container">{result}</div>
    </div>
  );
};

export default Editor;
