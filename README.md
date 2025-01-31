# Lotus Mobile App

A full-stack application that transcribes audio using AI technology. Built with Next.js for the frontend and FastAPI for the backend.

## Project Structure

lotus-app/
├── audio-transcriber/    # Frontend (Next.js)
│   ├── app/
│   ├── components/
│   ├── constants/
│   └── ...
└── backend/             # Backend (FastAPI)

## Technologies Used

### Frontend
- Next.js
- TypeScript
- TailwindCSS
- React Hooks

### Backend
- FastAPI (0.104.1)
- Python-multipart (0.0.6)
- OpenAI (1.3.0)
- Uvicorn (0.24.0)
- Python-dotenv (1.0.0)

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
2. Install dependencies:
   ```bash
   pip install -r requirements.txt

3. Create a .env file and add your environment variables:
   ```bash
   OPENAI_API_KEY=your_api_key_here

4. Start the server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   Navigate to the audio-transcriber directory:

2. Install dependencies and start:
   ```bash
   npm install
   npm run dev

## Features: 

- Audio file upload and processing
- Real-time transcription using AI
- Clean and intuitive user interface
- Cross-platform compatibility


