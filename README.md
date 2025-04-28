# 🪷 Lotus Mobile App

A full-stack app that transcribes audio using AI 🎙️→📝  
Frontend built with **Next.js** ⚡ | Backend powered by **FastAPI** 🚀

---

## 🏗️ Project Structure

```text
lotus-app/
├── audio-transcriber/    # Frontend (Next.js)
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── scripts/
│   ├── assets/
│   └── ...
└── backend/              # Backend (FastAPI)
```

## 🛠️ Tech Stack

Frontend: <br>
Next.js • TypeScript • TailwindCSS • React Hooks

Backend: <br>
FastAPI (0.104.1) • Python-multipart (0.0.6) • OpenAI (1.3.0) • Uvicorn (0.24.0) • Python-dotenv (1.0.0)

## 🚀 Getting Started

### Backend Setup: 

➡️ Navigate to the backend folder:
```bash
cd backend
```

➡️ Install Python dependencies:

```bash
pip install -r requirements.txt
```

➡️ Create a .env file with your API key:

```bash
OPENAI_API_KEY=your_api_key_here
```

➡️ Start the backend server:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend Setup

➡️ Navigate to the frontend folder:

```bash
cd audio-transcriber
```

➡️ Install Node.js dependencies and start the dev server:

```bash
npm install
npm run dev
```

## ✨ Features

Upload audio files

Real-time transcription powered by AI

Clean, minimal, and intuitive UI

Cross-platform ready (mobile + desktop)

## 📬 Contributions

Pull requests are welcome! Feel free to open an issue for bugs or feature requests.

