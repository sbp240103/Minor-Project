
const router = require('express').Router();
const Repository = require('../models/repository.model');
const { generateEmbeddings } = require('../services/gemini.service');

const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magA * magB);
};

router.post('/', async (req, res) => {
  try {
    const { query } = req.body;
    const queryEmbedding = await generateEmbeddings(query);

    const repositories = await Repository.find({ summaryEmbedding: { $exists: true } });

    const similarities = repositories.map(repo => ({
      repo,
      similarity: cosineSimilarity(queryEmbedding, repo.summaryEmbedding)
    }));

    similarities.sort((a, b) => b.similarity - a.similarity);

    const sortedRepos = similarities.map(sim => sim.repo);

    res.json(sortedRepos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
