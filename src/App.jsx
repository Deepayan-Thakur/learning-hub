import data from "./data/resources.json";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Learning Hub</h1>

      {Object.keys(data).map((category) => (
        <div key={category}>
          <h2>{category}</h2>

          {data[category].map((item, index) => (
            <div key={index} style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
              borderRadius: "8px"
            }}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <a href={item.url} target="_blank">Visit</a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;