import React from "react";
import ReactDOM from "react-dom";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <Form name="Blair Robinson" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
