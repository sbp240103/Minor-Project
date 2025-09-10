import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import SubmitRepo from "./pages/SubmitRepo";

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/submit">Submit Repo</Link>
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/submit" element={<SubmitRepo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

