import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TreeContainer from "./components/TreeContainer";
import json from "./json";
import owawaiList from "./owaraiList";

const options = owawaiList["owarai"].map((c, index) => {
  return { id: index, name: c };
});

function App() {
  const [activeNode, setActiveNode] = useState(null);
  const [filter, setFilter] = useState("");

  return (
    <div className="App">
      <Header
        lastUpdatedAt={json.timestamp}
        setActiveNode={setActiveNode}
        filter={filter}
        setFilter={setFilter}
        searchOptions={options}
      />
      <TreeContainer
        data={json}
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        filter={filter}
      />
    </div>
  );
}

export default App;
