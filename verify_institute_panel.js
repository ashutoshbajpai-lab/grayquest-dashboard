const puppeteer = require('puppeteer');

(async () => {
    console.log('🚀 Verifying Institute Panel Activation & Opening...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    try {
        await page.goto('http://localhost:3032', { waitUntil: 'networkidle2' });
        
        await page.evaluate(() => {
            if (window.switchTab) window.switchTab('inst-details');
        });
        await new Promise(r => setTimeout(r, 1000));

        const activeElems = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.active')).map(el => ({ tag: el.tagName, id: el.id, class: el.className }));
        });
        console.log('Active elements on page:', JSON.stringify(activeElems, null, 2));

    } catch (e) {
        console.error('❌ Test error:', e);
    } finally {
        await browser.close();
    }
})();
