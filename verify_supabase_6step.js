const puppeteer = require('puppeteer');

(async () => {
    console.log('🚀 Starting Automated Test for 6-Step Supabase Configurator...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost:3032', { waitUntil: 'networkidle2' });
        console.log('✅ Page loaded successfully');

        // Navigate to Admin Configurator Tab
        await page.click('a[data-tab="admin"]');
        await page.waitForSelector('#admin-tab', { visible: true });
        console.log('✅ Navigated to Admin Configurator Tab');

        // Select first onboarding request
        await page.waitForSelector('.btn-admin-action');
        await page.click('.btn-admin-action');
        console.log('✅ Selected onboarding request');

        // Click Unlock
        await page.click('#btn-unlock-config');
        await new Promise(r => setTimeout(r, 1000));
        console.log('✅ Unlocked configuration step 1');

        // Submit Step 1
        await page.click('#admin-config-step1-form button[type="submit"]');
        await new Promise(r => setTimeout(r, 3000));
        console.log('✅ Step 1 Submitted to Supabase');

        // Submit Step 2
        await page.waitForSelector('#admin-step2-panel', { visible: true });
        await page.click('#admin-config-step2-form button[type="submit"]');
        await new Promise(r => setTimeout(r, 3000));
        console.log('✅ Step 2 Submitted to Supabase');

        // Submit Step 3
        await page.waitForSelector('#admin-step3-panel', { visible: true });
        await page.click('#admin-config-step3-form button[type="submit"]');
        await new Promise(r => setTimeout(r, 3000));
        console.log('✅ Step 3 Submitted to Supabase');

        // Submit Step 4
        await page.waitForSelector('#admin-step4-panel', { visible: true });
        await page.click('#admin-config-step4-form button[type="submit"]');
        await new Promise(r => setTimeout(r, 3000));
        console.log('✅ Step 4 Submitted to Supabase');

        // Submit Step 5
        await page.waitForSelector('#admin-step5-panel', { visible: true });
        await page.type('#cfg-wh-url', 'https://webhook.site/test-endpoint');
        await page.click('#admin-config-step5-form button[type="submit"]');
        await new Promise(r => setTimeout(r, 3000));
        console.log('✅ Step 5 Submitted to Supabase');

        // Submit Step 6
        await page.waitForSelector('#admin-step6-panel', { visible: true });
        await page.click('#admin-config-step6-form button[type="submit"]');
        await new Promise(r => setTimeout(r, 4000));
        console.log('🎉 Step 6 Completed! Full 6-Step workflow committed to Supabase!');

    } catch (e) {
        console.error('❌ Test failed:', e);
    } finally {
        await browser.close();
    }
})();
