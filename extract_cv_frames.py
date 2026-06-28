import cv2
import os

video_path = "/Users/ashutoshbajpai/Desktop/Screen Recording 2026-06-28 at 10.09.50 PM.mov"
output_dir = "/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/frames_2"
os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)
if fps == 0: fps = 30
frame_interval = int(fps * 3) # sample every 3 seconds

count = 0
frame_id = 0
while cap.isOpened():
    ret, frame = cap.read()
    if not ret: break
    if count % frame_interval == 0:
        cv2.imwrite(os.path.join(output_dir, f"frame_{frame_id:03d}.png"), frame)
        frame_id += 1
    count += 1
cap.release()
print(f"Extracted {frame_id} frames using OpenCV!")
