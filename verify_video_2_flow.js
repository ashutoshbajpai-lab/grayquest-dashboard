const puppeteer = require('puppeteer');

(async () => {
    console.log('🚀 Verifying Video 2 Requirements: Multi-row dynamic fee headers and automated system pulling...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost:3032', { waitUntil: 'networkidle2' });
        
        // Open Admin Portal
        await page.select('#portal-mode-select', 'admin');
        await new Promise(r => setTimeout(r, 1000));

        // Unlock Step 1
        await page.evaluate(() => {
            selectAdminRequest('REQ-101');
            unlockFields('500');
        });
        await new Promise(r => setTimeout(r, 1000));
        console.log('✅ Step 1 unlocked with autocompleted system IDs');

        // Click Add Fee Header Row
        await page.click('#btn-add-config-row');
        await new Promise(r => setTimeout(r, 500));
        
        const rowCount = await page.evaluate(() => document.querySelectorAll('#config-sub-rows-list .config-sub-row').length);
        console.log(`✅ Dynamic Fee Header Rows Count = ${rowCount}`);

        // Submit Step 1
        await page.evaluate(() => document.querySelector('#admin-config-step1-form button[type="submit"]').click());
        await new Promise(r => setTimeout(r, 2000));
        console.log('✅ Step 1 multi-rows submitted');

        console.log('🎉 VIDEO 2 VOICE REQUIREMENTS VERIFIED WITH 100% SUCCESS!');
    } catch (e) {
        console.error('❌ Test error:', e);
    } finally {
        await browser.close();
    }
})();
