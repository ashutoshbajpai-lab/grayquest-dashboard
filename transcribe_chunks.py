import os
import subprocess
import wave
import speech_recognition as sr

video_path = "/Users/ashutoshbajpai/Desktop/Screen Recording 2026-06-28 at 10.09.50 PM.mov"
audio_wav = "/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/audio_full.wav"

print("Converting video to WAV using afconvert...")
subprocess.run(f'afconvert -f WAVE -d LEI16@16000 "{video_path}" "{audio_wav}"', shell=True)

with wave.open(audio_wav, 'r') as wf:
    frames = wf.getnframes()
    rate = wf.getframerate()
    duration = int(frames / float(rate))

print(f"Total audio duration: {duration} seconds")

r = sr.Recognizer()
full_transcript = []
chunk_len = 12

for offset in range(0, duration, chunk_len):
    try:
        with sr.AudioFile(audio_wav) as src:
            audio = r.record(src, offset=offset, duration=chunk_len)
            text = r.recognize_google(audio)
            print(f"[{offset}s - {offset+chunk_len}s]: {text}")
            full_transcript.append(f"[{offset}s - {offset+chunk_len}s]: {text}")
    except Exception as e:
        pass

full_text = "\n".join(full_transcript)
with open("/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/full_transcript_2.txt", "w") as f:
    f.write(full_text)
print("Saved full transcript!")
