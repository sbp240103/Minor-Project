import mongoose from "mongoose";

const repoSchema = new mongoose.Schema({
  userId: String,
  repoUrl: String,
  summary: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Repo", repoSchema);

