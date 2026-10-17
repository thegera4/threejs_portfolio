# 🤖 AI Features in Gerardo's Portfolio

This portfolio features two high-impact AI functionalities built with the **Vercel AI SDK**, designed to differentiate your portfolio to recruiters and engineering managers.

---

## 🌟 The Two AI Features

### 1. AI Chatbot Assistant ("Ask Gerardo's AI")
- **Location:** Floating badge in the bottom-right corner.
- **Capabilities:**
  - Answers real-time questions about your software engineering roles at Ford Motor Company and Financiera Independencia.
  - Highlights your 11-year industrial engineering background and why that gives you disciplined software engineering rigor.
  - Shares details on your 36k-download SQLite extension, 100+ GitHub repos, and tech stack proficiencies.
  - Provides quick-tap suggested questions recruiters frequently ask.
  - Preserves session conversation in `sessionStorage`.
  - Streams responses chunk-by-chunk using Vercel AI SDK's `streamText`.
  - Includes a built-in intelligent fallback for local development if no API key is set yet.

### 2. AI-Powered Smart Project Recommender
- **Location:** Bottom-left floating glassmorphic card.
- **Capabilities:**
  - Passively monitors visitor interests (reading time in sections, hovered technologies, and questions asked in chat).
  - Calculates an interest profile (`frontend`, `backend`, `mobile`, `fullstack`, `ai`, `devtools`).
  - Calls `/api/recommend` to dynamically generate a personalized 1-sentence recruiter pitch explaining why a specific project matches their interests.
  - Features a **"View 3D Demo"** button:
    - Smoothly scrolls to the `#projects` section.
    - Dynamically selects that project in the interactive 3D computer viewer via decoupled custom window events.
    - Signals your 3D avatar in the `#work` section to celebrate with a `victory`, `clapping`, or `salute` animation!

---

## ⚡ How to Change Models in Seconds

We built a modular abstraction in `api/ai-config.ts` so you can switch models at any time without modifying your UI or logic.

### Option A: Via Environment Variable (Zero Code Changes)
Add or update `AI_MODEL` in your `.env` or Vercel Project Settings:
```env
# Cheapest Google Gemini models:
AI_MODEL=gemini-1.5-flash    # Default: ultra-cheap, fast
# AI_MODEL=gemini-2.0-flash  # Next-gen low latency
# AI_MODEL=gemini-2.5-flash  # State of the art lightweight

# Cheapest OpenAI model:
# AI_MODEL=gpt-4o-mini       # OpenAI's budget champion
```

### Option B: Via `api/ai-config.ts`
Simply change the `DEFAULT_MODEL_ID` constant:
```typescript
export const DEFAULT_MODEL_ID: SupportedModelId = 'gemini-1.5-flash';
```

---

## 🔑 Setting Up Your API Keys & Vercel Credits

### Using Google Gemini (Cheapest & Recommended):
1. Get a key at [Google AI Studio](https://aistudio.google.com/) (Free tier available).
2. Add to `.env`:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   ```

### Using OpenAI:
1. Add to `.env`:
   ```env
   OPENAI_API_KEY=your_openai_key_here
   AI_MODEL=gpt-4o-mini
   ```

### Using Vercel AI Credits / Gateway:
If you have Vercel AI credits or want to route through Vercel's AI Gateway:
1. Set `AI_GATEWAY_URL` in `.env`:
   ```env
   AI_GATEWAY_URL=https://gateway.ai.cloudflare.com/v1/... # or Vercel Gateway URL
   ```

---

## 💻 Running Locally

Simply run:
```bash
pnpm dev
```
Thanks to our Vite dev plugin in `vite.config.ts`, `/api/chat` and `/api/recommend` run locally without needing `vercel dev` installed!

## 🚀 Deploying to Vercel

When you push to GitHub and deploy on Vercel:
1. Vercel automatically detects the `/api/chat.ts` and `/api/recommend.ts` serverless functions.
2. In your Vercel Project Settings -> Environment Variables, add:
   - `GOOGLE_GENERATIVE_AI_API_KEY` (or `OPENAI_API_KEY`)
   - `AI_MODEL=gemini-1.5-flash`
3. That's it! Everything works out of the box with zero server management.
