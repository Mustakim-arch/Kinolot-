import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// CHAT ROUTE
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Microvum Kinolot AI, a helpful assistant."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ IMPORTANT FIX FOR RENDER PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`AI server running on port ${PORT}`);
});