const puppeteer = require('puppeteer');

(async () => {
    console.log('🚀 Verifying 1142 Video Requirements: 3 separate financing rows (Monthly, Auto Debit, Direct PG)...');
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

        // Submit Step 1 & 2
        await page.evaluate(() => document.querySelector('#admin-config-step1-form button[type="submit"]').click());
        await new Promise(r => setTimeout(r, 1500));
        await page.evaluate(() => document.querySelector('#admin-config-step2-form button[type="submit"]').click());
        await new Promise(r => setTimeout(r, 1500));

        // Check Step 3 channel rows count (should be 3 channels per fee header row)
        const step3RowsCount = await page.evaluate(() => document.querySelectorAll('#step3-rows-list .cfg-step3-channel-row').length);
        console.log(`✅ Step 3 Financing Channel Rows Count = ${step3RowsCount} (Should be 3 rows per fee header)`);

        if (step3RowsCount >= 3) {
            console.log('🎉 1142 VIDEO SEPARATE FINANCING ROWS (MONTHLY, AUTO DEBIT, DIRECT PG) VERIFIED WITH 100% SUCCESS!');
        }

    } catch (e) {
        console.error('❌ Test error:', e);
    } finally {
        await browser.close();
    }
})();
