const express = require('express');
// Đã cập nhật tên thư viện đúng: @google/generative-ai
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());

// Lấy API Key từ Environment Variables trên Render
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

app.post('/ask', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(req.body.prompt);
    const response = await result.response;
    res.json({ result: response.text() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi rồi Sigma ơi: " + err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server đang chạy tại port ${PORT}`));
