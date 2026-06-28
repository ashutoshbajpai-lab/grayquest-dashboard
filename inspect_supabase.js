const https = require('https');

const options = {
    hostname: 'yolzhsonsmesmcswvdsg.supabase.co',
    path: '/rest/v1/',
    method: 'GET',
    headers: {
        'apikey': process.env.SUPABASE_KEY || 'sb_publishable_Eb7XSoRVsS77QgIRTtEQ4A_netA4Bej',
        'Authorization': 'Bearer ' + (process.env.SUPABASE_KEY || 'sb_publishable_Eb7XSoRVsS77QgIRTtEQ4A_netA4Bej')
    }
};

const req = https.request(options, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            console.log('Keys in schema:', Object.keys(parsed.definitions || {}));
        } catch (e) {
            console.log('Raw output:', data.substring(0, 200));
        }
    });
});

req.on('error', e => console.error(e));
req.end();
