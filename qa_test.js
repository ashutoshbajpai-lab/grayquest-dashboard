const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log(`[PAGE CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`));
        page.on('pageerror', error => console.log(`[PAGE ERROR]: ${error.message}`));
        
        page.on('response', response => {
            if (!response.ok()) {
                console.log(`[NETWORK ERROR] ${response.status()} ${response.url()}`);
            }
        });

        await page.goto('http://localhost:3031', { waitUntil: 'networkidle0' });
        
        await new Promise(r => setTimeout(r, 1000));
        
        await page.setViewport({ width: 1440, height: 900 });
        await page.screenshot({ path: '/Users/ashutoshbajpai/.gemini/antigravity/brain/160ab24e-5fc3-4171-8338-93d108f4af2f/screenshot.png', fullPage: true });
        
        // Let's check if the table bodies have children
        const html = await page.evaluate(() => {
            const tbody = document.getElementById('institutes-table-body');
            return tbody ? tbody.innerHTML.trim() : 'NOT FOUND';
        });
        console.log('Table Body HTML:', html ? html.substring(0, 100) + '...' : 'EMPTY');
        
        await browser.close();
    } catch (e) {
        console.error('Test Failed:', e);
    }
})();
