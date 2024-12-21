import React from "react";
import "./utils/userWorker";

import Editor from "./components/Editor/Editor";
import Task from "./components/Task/Task";
import Layout from "./ui/Layout/Layout";

import "./index.css";

const App: React.FC = () => {
  return (
    <>
      <h1>Code editor</h1>
      <Layout>
        <Task />
        <Editor />
      </Layout>
    </>
  );
};

export default App;
