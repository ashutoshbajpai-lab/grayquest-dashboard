import objc
import os
from AVFoundation import AVAsset, AVAssetTrack, AVMediaTypeVideo, AVMediaTypeAudio

path = '/Users/ashutoshbajpai/Desktop/Screen Recording 2026-06-28 at 4.46.57 PM.mov'
if not os.path.exists(path):
    print("File not found")
    exit(1)

asset = AVAsset.assetWithURL_(objc.Foundation.NSURL.fileURLWithPath_(path))
tracks = asset.tracks()
print(f"Total tracks found: {len(tracks)}")
for i, track in enumerate(tracks):
    print(f"Track {i+1}: MediaType={track.mediaType()}, Duration={track.timeRange().duration.value / track.timeRange().duration.timescale:.2f}s")
