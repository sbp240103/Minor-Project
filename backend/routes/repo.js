import express from "express";
import Repo from "../models/repo.js";
import fetch from "node-fetch";

const router = express.Router();

// Add new repo
router.post("/add", async (req, res) => {
  const { repoUrl } = req.body;

  // Fetch README from GitHub
  const apiUrl = repoUrl.replace("github.com", "api.github.com/repos") + "/readme";
  const readmeRes = await fetch(apiUrl, { headers: { "Accept": "application/vnd.github.v3.raw" } });
  const readme = await readmeRes.text();

  // Call LLM API for summary
  const summaryRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "Summarize this GitHub project in 3-4 lines." },
                 { role: "user", content: readme }]
    })
  });

  const data = await summaryRes.json();
  const summary = data.choices[0].message.content;

  const repo = await Repo.create({ repoUrl, summary, userId: "TODO:fromToken" });
  res.json(repo);
});

// Feed
router.get("/feed", async (req, res) => {
  const repos = await Repo.find().sort({ createdAt: -1 });
  res.json(repos);
});

export default router;

