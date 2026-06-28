import urllib.request
import json
import os

url = "https://yolzhsonsmesmcswvdsg.supabase.co/rest/v1/"
secret_key = os.environ.get("SUPABASE_KEY", "sb_publishable_Eb7XSoRVsS77QgIRTtEQ4A_netA4Bej")
headers = {
    "apikey": secret_key,
    "Authorization": f"Bearer {secret_key}"
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        spec = json.loads(response.read().decode())
        definitions = spec.get('definitions', spec.get('components', {}).get('schemas', {}))
        
        print(f"Found {len(definitions)} table definitions in Supabase OpenAPI spec:\n")
        all_schemas = {}
        for table_name, def_info in definitions.items():
            props = list(def_info.get('properties', {}).keys())
            all_schemas[table_name] = props
            print(f"📌 Table: '{table_name}' ({len(props)} columns)")
            print(f"   Columns: {props}\n")
            
        with open("/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/live_supabase_openapi_schemas.json", "w") as f:
            json.dump(all_schemas, f, indent=2)
except Exception as e:
    print(f"Error fetching OpenAPI spec: {e}")
