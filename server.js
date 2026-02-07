const express = require('express');
const { GoogleGenerativeAI } = require('@google-generative-ai/generative-ai');
const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

app.post('/ask', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(req.body.prompt);
    res.json({ result: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy Sigma đang chạy!"));
