import os
import wave
import speech_recognition as sr

audio_wav = "/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/audio_full.wav"
out_dir = "/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/chunks"
os.makedirs(out_dir, exist_ok=True)

with wave.open(audio_wav, 'rb') as wf:
    framerate = wf.getframerate()
    nframes = wf.getnframes()
    channels = wf.getnchannels()
    sampwidth = wf.getsampwidth()
    
    chunk_seconds = 10
    frames_per_chunk = chunk_seconds * framerate
    
    total_chunks = (nframes + frames_per_chunk - 1) // frames_per_chunk
    print(f"Total chunks to process: {total_chunks}")
    
    r = sr.Recognizer()
    full_transcript = []
    
    for i in range(total_chunks):
        chunk_path = os.path.join(out_dir, f"chunk_{i}.wav")
        chunk_frames = wf.readframes(frames_per_chunk)
        
        with wave.open(chunk_path, 'wb') as cw:
            cw.setnchannels(channels)
            cw.setsampwidth(sampwidth)
            cw.setframerate(framerate)
            cw.writeframes(chunk_frames)
            
        try:
            with sr.AudioFile(chunk_path) as src:
                audio = r.record(src)
                text = r.recognize_google(audio)
                line = f"Chunk {i} ({i*10}s - {(i+1)*10}s): {text}"
                print(line)
                full_transcript.append(line)
        except Exception:
            pass

with open("/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/complete_voice_transcript.txt", "w") as f:
    f.write("\n".join(full_transcript))
print("FINISHED FULL TRANSCRIPTION!")
