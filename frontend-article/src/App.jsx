import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/get-article");
        if (!res.ok) throw new Error("Failed to fetch articles");

        const data = await res.json();

        // normalize: [[...]] -> [...]
        const list = Array.isArray(data)
          ? Array.isArray(data[0])
            ? data[0]
            : data
          : [];

        setArticles(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) return <p className="state-text">Loading articles...</p>;
  if (error)
    return (
      <p className="state-text" style={{ color: "crimson" }}>
        {error}
      </p>
    );

  // 👉 Full article view
  if (selected) {
    return (
      <div className="app-container">
        <div className="article-card">
          <button className="back-btn" onClick={() => setSelected(null)}>
            ← Back
          </button>
          <h1 className="article-title">{selected.title}</h1>
          <div className="article-content">{selected.content}</div>
        </div>
      </div>
    );
  }

  // 👉 Cards list view
  return (
    <div className="app-container">
      <div className="cards-grid">
        {articles.map((a) => (
          <div
            key={a.id}
            className="article-preview-card"
            onClick={() => setSelected(a)}
          >
            <h3>{a.title}</h3>
            <p>
              {a.content.length > 120
                ? a.content.slice(0, 120) + "..."
                : a.content}
            </p>
            <span className="read-more">Read more →</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
