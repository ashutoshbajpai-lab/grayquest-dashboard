import subprocess

result = subprocess.run(['node', '--check', '/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/app.js'], capture_output=True, text=True)
print("Node syntax check output:")
print(result.stderr or result.stdout)
