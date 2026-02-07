const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());

// Kiểm tra API Key
if (!process.env.GEMINI_KEY) {
  console.error("⚠️ GEMINI_KEY chưa được set");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

app.post('/ask', async (req, res) => {
  try {
    // Kiểm tra prompt
    if (!req.body.prompt || req.body.prompt.trim() === '') {
      return res.status(400).json({ error: "Prompt không được để trống" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(req.body.prompt);
    const response = await result.response;
    
    res.json({ result: response.text }); // Bỏ () ở text
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi rồi Sigma ơi: " + err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server đang chạy tại port ${PORT}`));
