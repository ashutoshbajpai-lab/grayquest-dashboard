import speech_recognition as sr
import wave
import math
import os

audio_path = '/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/audio.wav'
r = sr.Recognizer()

with wave.open(audio_path, 'rb') as wf:
    frame_rate = wf.getframerate()
    n_frames = wf.getnframes()
    duration = n_frames / float(frame_rate)
    print(f"Total Audio Duration: {duration:.2f} seconds")

chunk_duration = 30 # seconds
n_chunks = math.ceil(duration / chunk_duration)

full_transcript = []
with sr.AudioFile(audio_path) as source:
    for i in range(n_chunks):
        print(f"Processing chunk {i+1}/{n_chunks}...")
        audio_chunk = r.record(source, duration=chunk_duration)
        try:
            text = r.recognize_google(audio_chunk)
            print(f"Chunk {i+1}: {text}")
            full_transcript.append(text)
        except sr.UnknownValueError:
            print(f"Chunk {i+1}: [Unclear / Silence]")
        except Exception as e:
            print(f"Chunk {i+1} Error: {e}")

final_text = " ".join(full_transcript)
print("\n=== FINAL EXTRACTED TRANSCRIPT ===")
print(final_text)
print("===================================")

with open('/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/transcript.txt', 'w') as f:
    f.write(final_text)
