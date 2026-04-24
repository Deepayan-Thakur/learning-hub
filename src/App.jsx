import { useState } from "react";
import data from "./data/resources.json";

function App() {
  const [search, setSearch] = useState("");

  // Filter logic
  const filteredData = {};

  for (const category in data) {
    filteredData[category] = data[category].filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Learning Hub</h1>

      {/* 🔍 SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px"
        }}
      />

      {/* 📂 RENDER DATA */}
      {Object.keys(filteredData).map((category) => (
        <div key={category}>
          <h2>{category}</h2>

          {filteredData[category].length === 0 ? (
            <p style={{ color: "gray" }}>No results</p>
          ) : (
            filteredData[category].map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid gray",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "8px"
                }}
              >
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <a href={item.url} target="_blank">Visit</a>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

export default App;