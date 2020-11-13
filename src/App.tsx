import React from "react";

import BudgetBar from "./components/BudgetBar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BudgetBar />
        <BudgetBar />
        <BudgetBar />
      </header>
    </div>
  );
}

export default App;
