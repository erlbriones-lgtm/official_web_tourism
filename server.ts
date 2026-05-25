import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let gClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // Graceful fallback if API key is not set
    return null;
  }
  if (!gClient) {
    gClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return gClient;
}

// API Route: Cultural & Concierge Companion "Sikatuna AI"
app.post("/api/tourism-companion", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format. Expected an array." });
    }

    const ai = getGemini();
    if (!ai) {
      // Elegant mocked fallback responses if Gemini key is missing
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
      let mockReply = "Welcome to Tagbilaran, the City of Peace and Friendship! I am Sikatuna AI, your heritage assistant. I am standing by using our offline reserve database. How may I guide you through our historic landmarks, clay pottery arts, and creative industries today?";
      
      if (lastUserMsg.includes("sandugo") || lastUserMsg.includes("blood compact") || lastUserMsg.includes("friendship")) {
        mockReply = "The Sandugo, or official Blood Compact, took place on March 16, 1565 between Datu Sikatuna and Spanish explorer Miguel López de Legazpi in Bohol, Tagbilaran. It was a solemn pact establishing peace and friendship. Today, we elevate this heritage into a creative canvas of modern culinary arts, theater, and digital design!";
      } else if (lastUserMsg.includes("unesco") || lastUserMsg.includes("creative") || lastUserMsg.includes("clay") || lastUserMsg.includes("art")) {
        mockReply = "Tagbilaran is flourishing as a candidate for the UNESCO Creative Cities Network. We are particularly famous for our ancient clay pottery traditions (such as the traditional pottery in Manga and Dampas districts) and our vibrant young community of digital creators, fiber artisans, and modern musicians.";
      } else if (lastUserMsg.includes("landmark") || lastUserMsg.includes("place") || lastUserMsg.includes("visit")) {
        mockReply = "I highly recommend visiting: \n1. Modernized Heritage District / Tagbilaran City Hall\n2. St. Joseph the Worker Cathedral (dating back to 1724 with beautiful ceiling frescos)\n3. The Bohol Sandugo Shrine with its majestic overlooking view of the Bohol Sea\n4. Our creative hubs and pottery sheds in Manga, showcasing authentic Bohol pottery.";
      }
      return res.json({ text: mockReply });
    }

    // Format historical messages for chat
    const formattedPrompt = messages.map(m => `${m.role === "user" ? "User" : "Sikatuna AI"}: ${m.content}`).join("\n");
    const systemPrompt = `You are "Sikatuna AI", the official cultural concierge and heritage ambassador for the Tagbilaran City Tourism Web Platform. 
Your tone must be authoritative, poetic, globally sophisticated, and deeply hospitable—worthy of a UNESCO-recognized city of "Peace and Friendship."
Ensure every response features vivid, elegant local details, celebrating Tagbilaran's creative scene:
- Historic Blood Compact (Sandugo) in Barangay Bohol in 1565.
- Our ancient clay craft roots (banga and clay pottery in Manga and Dampas districts).
- Beautiful colonial architecture, like the St. Joseph the Worker Cathedral.
- Creative communities merging traditional design with technology (digital art, eco-architecture).
- Refined food scene, merging traditional Bol-ano delicacies like Calamay with contemporary gastronomy.

Respond directly and concisely in markdown format. Keep answers beautiful and rich with substance. Avoid larping metadata or system logs.`;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({ text: result.text || "" });
  } catch (error: any) {
    console.error("Gemini companion error:", error);
    res.status(500).json({ error: error?.message || "Internal server error" });
  }
});

// API Route: Local weather & creative telemetry
app.get("/api/local-status", (req, res) => {
  // Philippine Standard Time is UTC+8
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const pstTime = new Date(utc + (3600000 * 8));
  
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  
  const alerts = [
    { id: 1, type: "UNESCO Nomination", text: "Tagbilaran Crafts & Folk Art portfolio reviewed by the National Commission for Culture and the Arts." },
    { id: 2, type: "Heritage Restorations", text: "Preservation works are officially complete at the iconic St. Joseph Cathedral plaza." },
    { id: 3, type: "Artisan Sync", text: "Manga District pottery collective holds live terracotta pottery wheel showcase this Saturday." }
  ];

  res.json({
    time: formatter.format(pstTime),
    timezone: "PST (UTC+8)",
    weather: {
      temperature: 31,
      humidity: 74,
      condition: "Gentle Coastal Breeze",
      description: "Partly cloudy with warm tropical golden sunlight",
      windSpeed: "12 km/h"
    },
    alerts
  });
});

// Serve static assets or set up Vite middleware
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tagbilaran Tourism dev server running at http://0.0.0.0:${PORT}`);
  });
}

start();
