import os
import subprocess
import speech_recognition as sr

video_path = "/Users/ashutoshbajpai/Desktop/Screen Recording 2026-06-28 at 10.09.50 PM.mov"
wav_path = "/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/audio_2.wav"

print("Extracting audio using afconvert / ffmpeg...")
# Try ffmpeg first, if not try afconvert
cmd = f'ffmpeg -y -i "{video_path}" -ar 16000 -ac 1 "{wav_path}"'
res = subprocess.run(cmd, shell=True, capture_output=True, text=True)

if res.returncode != 0:
    print("ffmpeg failed or not found, trying afconvert...")
    cmd2 = f'afconvert -f WAVE -d LEI16@16000 "{video_path}" "{wav_path}"'
    subprocess.run(cmd2, shell=True)

r = sr.Recognizer()
with sr.AudioFile(wav_path) as source:
    audio_data = r.record(source)
    try:
        text = r.recognize_google(audio_data)
        print("--- VOICE TRANSCRIPTION ---")
        print(text)
        with open("/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/transcript_2.txt", "w") as f:
            f.write(text)
    except Exception as e:
        print("Error recognizing speech:", e)
