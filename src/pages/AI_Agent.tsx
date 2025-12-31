import React, { useEffect, useRef, useState } from "react";

/* ================= API KEY ================= */
const GEMINI_KEY = "AIzaSyAfU5zPNEzYaJiO9Yf4ACBBy4V8T2Ebhyo"; // <-- Backend me move karna better hai

/* ================= TYPES ================= */
type Message = {
  type: "user" | "bot";
  text: string;
};

/* ================= LANGUAGE DETECTION ================= */
const detectLanguage = (text: string) => {
  return /[अ-ह]/.test(text) ? "hi" : "en";
};

/* ================= COMPONENT ================= */
const Niko: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  /* ================= SPEECH RECOGNITION ================= */
  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SR) return;

    const recog = new SR();
    recog.lang = "hi-IN";
    recog.interimResults = false;

    recog.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      handleSend(text);
    };

    recognitionRef.current = recog;
  }, []);

  /* ================= GEMINI CALL ================= */
  const askGemini = async (userText: string, lang: "hi" | "en") => {
    const systemPrompt = `
You are Aura, a friendly career and education guide.
Reply in ${lang === "hi" ? "Hindi" : "English"}.
Be encouraging and helpful with emojis 😊
`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt + "\nUser: " + userText,
                },
              ],
            },
          ],
        }),
      }
    );

    const raw = await res.text();
    console.log("Gemini RAW:", raw);

    if (!res.ok) {
      throw new Error("Gemini API error");
    }

    const data = JSON.parse(raw);
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "🤖 Thoda aur detail batao 🙂"
    );
  };

  /* ================= SPEAK ================= */
  const speak = (text: string, lang: "hi" | "en") => {
    // Remove emojis for speech
    const cleanText = text.replace(/[\u{1F300}-\u{1FAFF}]/gu, "").replace(/[\u2600-\u26FF]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === "hi" ? "hi-IN" : "en-US";

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  /* ================= SEND MESSAGE ================= */
  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { type: "user", text }]);
    setInput("");

    const lang = detectLanguage(text);

    try {
      const reply = await askGemini(text, lang);
      setMessages((m) => [...m, { type: "bot", text: reply }]);
      speak(reply, lang);
    } catch {
      setMessages((m) => [
        ...m,
        { type: "bot", text: "❌ AI se connect nahi ho paaya" },
      ]);
    }
  };

  /* ================= UI ================= */
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎤 Career Saathi AI</h2>

      <div ref={chatRef} style={styles.chat}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.msg,
              alignSelf: m.type === "user" ? "flex-end" : "flex-start",
              background: m.type === "user" ? "#2563eb" : "#e5e7eb",
              color: m.type === "user" ? "#fff" : "#000",
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Apna sawal likho..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
        />

        <button onClick={() => handleSend(input)} style={styles.btn}>
          Send
        </button>

        <button
          onClick={() => recognitionRef.current?.start()}
          style={styles.mic}
        >
          🎙
        </button>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */
const styles: any = {
  container: {
    width: "100%",
    maxWidth: 600,
    margin: "auto",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
    padding: 10,
    background: "#1d4ed8",
    color: "#fff",
  },
  chat: {
    flex: 1,
    overflowY: "auto",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  msg: {
    padding: "10px 14px",
    borderRadius: 16,
    maxWidth: "80%",
  },
  inputBox: {
    display: "flex",
    gap: 6,
    padding: 10,
    borderTop: "1px solid #ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    border: "1px solid #ccc",
  },
  btn: {
    padding: "0 16px",
    borderRadius: 20,
    border: "none",
    background: "#2563eb",
    color: "#fff",
  },
  mic: {
    padding: "0 14px",
    borderRadius: "50%",
    border: "none",
    background: "#e5e7eb",
  },
};

export default Niko;
