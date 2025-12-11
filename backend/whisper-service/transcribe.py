# import sys
# import whisper
# import json

# model = whisper.load_model("small")  # free + accurate + works on CPU

# def transcribe_audio(path):
#     result = model.transcribe(path)
#     return result["text"]

# if __name__ == "__main__":
#     audio_path = sys.argv[1]
#     text = transcribe_audio(audio_path)
#     print(json.dumps({"text": text}))
import sys
import whisper

model = whisper.load_model("small")  # small = good speed on CPU

def transcribe_audio(path):
    result = model.transcribe(path)
    return result["text"]

if __name__ == "__main__":
    audio_path = sys.argv[1]
    text = transcribe_audio(audio_path)
    print(text)   # <-- IMPORTANT: raw text only!
