import urllib.request
import json

base_url = "https://yolzhsonsmesmcswvdsg.supabase.co/rest/v1"
headers = {
    "apikey": "sb_publishable_Eb7XSoRVsS77QgIRTtEQ4A_netA4Bej",
    "Authorization": "Bearer sb_publishable_Eb7XSoRVsS77QgIRTtEQ4A_netA4Bej"
}

tables = [
    ("Step 1: Fee type details", "Fee type details"),
    ("Step 2: Fee Group Details", "Fee Group Details"),
    ("Step 3: Financing details", "Financing details"),
    ("Step 4: Merchant Details Sheet", "Merchant Details Sheet"),
    ("Step 5: Webhook's event", "Webhook's event"),
    ("Step 6: Events Sheet", "Events Sheet")
]

schemas = {}

for step_label, table_name in tables:
    url = f"{base_url}/{urllib.parse.quote(table_name)}?select=*&limit=1"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data and len(data) > 0:
                cols = list(data[0].keys())
                schemas[table_name] = cols
                print(f"\n✅ {step_label} ('{table_name}') Columns ({len(cols)} columns):")
                print(cols)
            else:
                print(f"\n⚠️ {step_label} ('{table_name}'): No records found to extract keys.")
    except Exception as e:
        print(f"\n❌ Error fetching {table_name}: {e}")

with open("/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/live_supabase_schemas.json", "w") as f:
    json.dump(schemas, f, indent=2)
