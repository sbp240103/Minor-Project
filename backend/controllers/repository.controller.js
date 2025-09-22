const Repository = require('../models/repository.model');
const { generateSummary, extractTechStack, generateEmbeddings } = require('../services/gemini.service');

exports.createRepository = async (req, res) => {
  try {
    const { name, description, githubRepo } = req.body;
    const owner = req.user;

    if (!name || !description || !githubRepo) {
      console.error('Missing required fields:', { name, description, githubRepo });
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    let summary = 'Summary not available.';
    let techStack = ['Unknown'];
    let summaryEmbedding = [];
    let geminiError = null;

    try {
      summary = await generateSummary([githubRepo]);
    } catch (e) {
      console.error('Error generating summary:', e);
      geminiError = 'Summary could not be generated.';
    }
    try {
      techStack = await extractTechStack([githubRepo]);
    } catch (e) {
      console.error('Error extracting tech stack:', e);
      geminiError = 'Tech stack could not be generated.';
    }
    try {
      summaryEmbedding = await generateEmbeddings(summary);
    } catch (e) {
      console.error('Error generating summary embedding:', e);
      geminiError = 'Summary embedding could not be generated.';
    }

    const newRepository = new Repository({
      owner,
      name,
      description,
      files: [],
      githubRepo,
      summary,
      techStack,
      summaryEmbedding,
    });

    try {
      const savedRepository = await newRepository.save();
      res.json({ repository: savedRepository, geminiError });
    } catch (e) {
      console.error('Error saving repository:', e);
      res.status(500).json({ error: 'Error saving repository.' });
    }
  } catch (err) {
    console.error('General error in createRepository:', err);
    res.status(500).json({ error: err.message });
  }
};
