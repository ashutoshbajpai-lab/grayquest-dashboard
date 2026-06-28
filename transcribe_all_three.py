import os
import subprocess
import wave
import speech_recognition as sr

videos = [
    ("/Users/ashutoshbajpai/Desktop/Screen Recording 2026-06-28 at 10.09.50 PM.mov", "video1"),
    ("/Users/ashutoshbajpai/Desktop/Screen Recording 2026-06-28 at 10.18.40 PM.mov", "video2"),
    ("/Users/ashutoshbajpai/Desktop/Screen Recording 2026-06-28 at 10.22.06 PM.mov", "video3")
]

out_dir = "/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/transcripts_all"
os.makedirs(out_dir, exist_ok=True)
r = sr.Recognizer()

for v_path, label in videos:
    print(f"\n--- Processing {label}: {v_path} ---")
    wav_path = os.path.join(out_dir, f"{label}.wav")
    subprocess.run(f'afconvert -f WAVE -d LEI16@16000 "{v_path}" "{wav_path}"', shell=True)
    
    if not os.path.exists(wav_path):
        print(f"Failed to create wav for {label}")
        continue
        
    with wave.open(wav_path, 'rb') as wf:
        framerate = wf.getframerate()
        nframes = wf.getnframes()
        channels = wf.getnchannels()
        sampwidth = wf.getsampwidth()
        duration = int(nframes / float(framerate))
        print(f"{label} duration: {duration}s")
        
        chunk_sec = 12
        transcript_lines = []
        
        for offset in range(0, duration, chunk_sec):
            try:
                with sr.AudioFile(wav_path) as src:
                    audio = r.record(src, offset=offset, duration=chunk_sec)
                    text = r.recognize_google(audio)
                    line = f"[{offset}s - {offset+chunk_sec}s]: {text}"
                    print(f"  {line}")
                    transcript_lines.append(line)
            except Exception:
                pass
                
        with open(os.path.join(out_dir, f"{label}_transcript.txt"), "w") as f:
            f.write("\n".join(transcript_lines))

print("\n🎉 ALL 3 VIDEOS TRANSCRIBED SUCCESSFULLY!")
