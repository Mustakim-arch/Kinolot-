import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

/* ✅ REQUIRED MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* 🔐 OPENAI CLIENT (KEY FROM RENDER ENV) */
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* ❤️ HEALTH CHECK (optional but useful) */
app.get("/", (req, res) => {
  res.send("Microvum Kinolot AI is running 🚀");
});

/* 💬 CHAT ROUTE (IMPORTANT) */
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Microvum Kinolot AI, a helpful assistant created by Microvum."
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

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      error: "Something went wrong with AI request"
    });
  }
});

/* 🚀 IMPORTANT FOR RENDER PORT */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Microvum Kinolot AI running on port ${PORT}`);
});