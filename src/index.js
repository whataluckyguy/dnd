import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";
import App from "./App";
import "./utils/index.css"
import Context from "./Contexts/EmailContent"

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <DndProvider backend={HTML5Backend}>
        <App/>
      </DndProvider>
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);