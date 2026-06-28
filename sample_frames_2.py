import subprocess
import os

video_path = "/Users/ashutoshbajpai/Desktop/Screen Recording 2026-06-28 at 10.09.50 PM.mov"
output_dir = "/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/frames_2"
os.makedirs(output_dir, exist_ok=True)

print("Extracting frames...")
cmd = f'ffmpeg -y -i "{video_path}" -vf "fps=1/3" "{output_dir}/frame_%03d.png"'
subprocess.run(cmd, shell=True)
print("Frames extracted to", output_dir)
