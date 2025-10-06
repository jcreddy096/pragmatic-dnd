import React from "react";
// import TaskBoard from "./components/TaskBoard";
// import "./components/TaskBoard.css";
import SingleColumn from "./SingleColumn";

export default function App() {
  return (
    <div className="app">
      <h1>Pragmatic DnD Task Board</h1>
      {/* <TaskBoard /> */}
      <SingleColumn />
    </div>
  );
}
