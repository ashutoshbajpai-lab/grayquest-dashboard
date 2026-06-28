import json

with open("/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/live_supabase_openapi_schemas.json", "r") as f:
    schemas = json.load(f)

print("🚀 Matching Screenshot Tables to System Architecture:\n")
for table, cols in schemas.items():
    print(f"✅ Table: '{table}'")
    print(f"   Total Columns: {len(cols)}")
    print(f"   Columns List: {cols[:5]}... (+{len(cols)-5} more)\n")
