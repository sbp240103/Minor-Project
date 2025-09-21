
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateSummary = async (files) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `
    The following are files from a code repository.
    Please generate a summary of the repository.
    Files:
    ${files.join('\n')}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};

const extractTechStack = async (files) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `
    The following are files from a code repository.
    Please identify the technologies and programming languages used in this repository.
    Return a comma-separated list of the technologies.
    Files:
    ${files.join('\n')}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text.split(',').map(tech => tech.trim());
};

const generateEmbeddings = async (text) => {
  const model = genAI.getGenerativeModel({ model: "embedding-001"});
  const result = await model.embedContent(text);
  const embedding = result.embedding;
  return embedding.values;
};

module.exports = { generateSummary, extractTechStack, generateEmbeddings };
