# 🧠 AI Strategy & Prompt Engineering: AuditAI

- This document outlines the `Gemini AI` configuration and the prompt engineering strategies used within `AuditAI` to generate CFO-ready financial insights.

---

## 🚀 Why Gemini over Anthropic/OpenAI?

While Anthropic (Claude) and OpenAI (GPT) are capable, Gemini was selected for specific architectural advantages:

- **_⚡ Speed & Latency:_** The `flash` series models offer near-instant response times, which is critical for a "Real-time" dashboard experience.

- **_🔗 Ecosystem Integration:_** As a startup-focused tool, Gemini’s native ability to handle structured data (JSON) and its massive context window ensures no audit detail is missed.

- **_💰 Cost Efficiency:_** For high-volume SaaS audits, Gemini provides a superior performance-to-price ratio compared to Claude 3.5 Sonnet.

- **_🛡️ Enterprise Safety:_** Google’s built-in safety filters ensure that financial summaries remain professional and avoid hallucinating unrealistic savings.

---

## 📝 The Prompt Logic

The `generateAuditSummary` function uses a Role-Based Prompting strategy to ensure the output is calibrated for executive-level reading.

### 🎭 System Instruction (The "Who")

> "You are a specialized finance auditor for startups. Your job is to provide a concise, professional summary of AI tool spend."

By setting this at the system level, we ensure the AI doesn't act as a creative writer or a chatbot, but as a `CFO-level consultant`.

### 🛠️ The Prompt Template

```Markdown
Analyze the following AI spend data for a startup:
${JSON.stringify(auditData)}

Write a ~100-word summary explaining the findings.
Focus on the biggest waste and the value of switching to recommendations.
Be professional and logical enough for a CFO.

```

---

## 💎 Key Prompt Features

- **_📊 Data Injection:_** We pass raw `auditData` as a JSON string. Gemini is exceptionally good at parsing these structures without needing a separate pre-processor.

- **_🎯 Targeted Focus:_** The prompt explicitly directs the AI to look for **_"Waste"_** and **_"Value"_**, preventing it from just listing the tools back to the user.

- **_⚖️ Tone Control:_** The instruction **_"Logical enough for a CFO"_** forces the model to use professional terminology (e.g., ROI, burn rate, optimization) rather than generic "cool" AI speak.

- **_🛡️ Error Handling (The "Graceful Fallback"):_** If the API fails or rate limits, the code is designed to generate a manual summary based on the `totalMonthlySavings` data, ensuring the UI never breaks.

---

## 📈 Performance Goals

- **_Word Count:_** ~100 words (To ensure it fits perfectly in the `AuditSummary.tsx` card).

- **_Logic:_** Prioritize the tool with the highest cost-to-value gap.

- **_Output:_** Pure Markdown for seamless rendering in the React frontend.

---

<div align="center">

Last Updated: May 2026 |
Model Version: gemini-2.5-flash 🚀

</div>
