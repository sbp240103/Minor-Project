import { useEffect, useState } from "react";
import axios from "axios";

function Feed() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/repo/feed")
      .then(res => setRepos(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3">Project Feed</h1>
      {repos.map((r, i) => (
        <div key={i} className="border p-2 mb-3 rounded">
          <a href={r.repoUrl} target="_blank" className="font-semibold">{r.repoUrl}</a>
          <p>{r.summary}</p>
        </div>
      ))}
    </div>
  );
}

export default Feed;

