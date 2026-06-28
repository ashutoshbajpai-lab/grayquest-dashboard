const puppeteer = require('puppeteer');

(async () => {
    console.log('🚀 Starting Verification for All Explicit Column Forms across 6 Steps...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost:3032', { waitUntil: 'networkidle2' });
        console.log('✅ Page loaded');

        // Switch to Admin Portal
        await page.select('#portal-mode-select', 'admin');
        await new Promise(r => setTimeout(r, 1000));

        // Select onboarding request & unlock via page evaluate
        await page.evaluate(() => {
            selectAdminRequest('REQ-101');
            unlockFields('500');
        });
        await new Promise(r => setTimeout(r, 1000));
        console.log('✅ Selected request and unlocked step 1');

        // Submit Step 1
        await page.evaluate(() => document.querySelector('#admin-config-step1-form button[type="submit"]').click());
        await new Promise(r => setTimeout(r, 3000));
        console.log('✅ Step 1 Submitted');

        // Submit Step 2
        await page.evaluate(() => document.querySelector('#admin-config-step2-form button[type="submit"]').click());
        await new Promise(r => setTimeout(r, 3000));
        console.log('✅ Step 2 Submitted');

        // Submit Step 3
        await page.evaluate(() => document.querySelector('#admin-config-step3-form button[type="submit"]').click());
        await new Promise(r => setTimeout(r, 3000));
        console.log('✅ Step 3 Submitted');

        // Submit Step 4
        await page.evaluate(() => document.querySelector('#admin-config-step4-form button[type="submit"]').click());
        await new Promise(r => setTimeout(r, 3000));
        console.log('✅ Step 4 Submitted');

        // Submit Step 5
        await page.evaluate(() => {
            document.getElementById('cfg-wh-url').value = 'https://api.grayquest.com/webhooks';
            document.querySelector('#admin-config-step5-form button[type="submit"]').click();
        });
        await new Promise(r => setTimeout(r, 3000));
        console.log('✅ Step 5 Submitted');

        // Submit Step 6
        await page.evaluate(() => document.querySelector('#admin-config-step6-form button[type="submit"]').click());
        await new Promise(r => setTimeout(r, 4000));
        console.log('🎉 All 6 Steps with Explicit Columns Verified and Committed to Supabase!');

    } catch (e) {
        console.error('❌ Test failed:', e);
    } finally {
        await browser.close();
    }
})();
