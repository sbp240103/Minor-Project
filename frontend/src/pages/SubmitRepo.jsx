import { useState } from "react";
import axios from "axios";

function SubmitRepo() {
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/repo/add",
      { repoUrl },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Repository submitted!");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-3">Submit Repository</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input 
          type="text" 
          value={repoUrl} 
          onChange={(e) => setRepoUrl(e.target.value)} 
          placeholder="https://github.com/user/repo"
          className="border p-2"
        />
        <button type="submit" className="bg-purple-500 text-white p-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SubmitRepo;

