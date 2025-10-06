# lotus mobile app

full-stack audio transcription: next.js frontend and fastapi backend. upload an audio file, get text.

## structure
```text
lotus-app/
├─ audio-transcriber/   # next.js frontend
└─ backend/             # fastapi backend
````

## install & run

```bash
# backend
cd backend
pip install -r requirements.txt
# .env
echo OPENAI_API_KEY=your_api_key_here > .env
uvicorn main:app --host 0.0.0.0 --port 8000
```

```bash
# frontend
cd audio-transcriber
npm install
npm run dev
```

next.js + typescript + tailwind; fastapi + uvicorn; openai sdk; python-dotenv; python-multipart.

feats: file upload, real-time transcription, simple ui. contributions via prs or issues.
