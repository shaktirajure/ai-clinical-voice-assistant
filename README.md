# 🩺 Clinical Voice Assistant  
A real-time clinical dictation tool built with **React**, **NestJS**, **Whisper (local)**, and **WebSockets**.  
It allows clinicians to speak naturally, transcribes the audio live, and generates structured **SOAP Notes** using AI.


## 🚀 Features

### 🎤 **Real-time Voice Capture**
- Capture microphone audio directly in the browser.
- Streams audio chunks to the backend using WebSockets.

### 🧠 **Local Whisper Transcription**
- Uses **OpenAI Whisper (small model)** running locally via Python.
- Converts speech to text with high accuracy.

### 🔌 **NestJS Backend with WebSockets**
- Receives audio chunks.
- Calls Whisper transcriber.
- Sends live transcripts back to frontend.

### 📝 **Automatic SOAP Note Generator**
- Takes the final transcript.
- Generates a structured clinical SOAP note:
  - Subjective  
  - Objective  
  - Assessment  
  - Plan  

### 🖥️ **Clean React Frontend**
- Press "Start Recording" → speak → get transcription in real time.
- Press "Generate SOAP Note" to get formatted output.

---

## 🏗️ **Architecture Overview**

React UI → WebSocket → NestJS Gateway → Python Whisper Script
← WebSocket (live transcripts)
→ AI SOAP Generator (Ollama or OpenAI)

yaml
Copy code

---

## 📂 Project Structure

ai-clinical-voice-assistant/
│
├── backend/ # NestJS backend
│ ├── src/
│ │ ├── gateway/ # WebSocket audio gateway
│ │ ├── notes/ # SOAP generator endpoints
│ │ └── ...
│ ├── whisper-service/ # Python whisper local script
│ └── ...
│
├── frontend/ # React UI
│ ├── src/
│ └── ...
│
├── .gitignore
├── README.md
└── ...

yaml
Copy code

---

## 🧪 Running the Project

### 1️⃣ **Start the Backend**
```bash
cd backend
npm install
npm run start
2️⃣ Install Whisper Dependencies
bash
Copy code
cd backend/whisper-service
pip install -r requirements.txt
3️⃣ Start the Frontend
bash
Copy code
cd frontend
npm install
npm start

Screenshots
<img width="1206" height="1014" alt="image" src="https://github.com/user-attachments/assets/4710bbd1-3b9d-4b43-81a1-100d2eccb365" />

