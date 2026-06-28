import os
import subprocess
import glob
import wave
import speech_recognition as sr

v_path = "/Users/ashutoshbajpai/Desktop/Screen Recording 2026-06-28 at 11.42.14 PM.mov"
if not os.path.exists(v_path):
    print("Exact path not found, searching Desktop for matching files...")
    matches = glob.glob("/Users/ashutoshbajpai/Desktop/*11.42*.mov") + glob.glob("/Users/ashutoshbajpai/Desktop/*11.4*.mov") + glob.glob("/Users/ashutoshbajpai/Desktop/*.mov")
    if matches:
        v_path = max(matches, key=os.path.getmtime)
        print("Found latest matching file:", v_path)

wav_path = "/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/audio_1142.wav"
print(f"Converting {v_path} to WAV...")
subprocess.run(['afconvert', '-f', 'WAVE', '-d', 'LEI16@16000', v_path, wav_path])

r = sr.Recognizer()
with wave.open(wav_path, 'rb') as wf:
    framerate = wf.getframerate()
    nframes = wf.getnframes()
    duration = int(nframes / float(framerate))
    print(f"Audio duration: {duration}s")
    
    chunk_sec = 12
    transcript_lines = []
    
    for offset in range(0, duration, chunk_sec):
        try:
            with sr.AudioFile(wav_path) as src:
                audio = r.record(src, offset=offset, duration=chunk_sec)
                text = r.recognize_google(audio)
                line = f"[{offset}s - {offset+chunk_sec}s]: {text}"
                print(line)
                transcript_lines.append(line)
        except Exception as e:
            pass

full_text = "\n".join(transcript_lines)
with open("/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/transcript_1142.txt", "w") as f:
    f.write(full_text)
print("Saved 1142 transcript!")
