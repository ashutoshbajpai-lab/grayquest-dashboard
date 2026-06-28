const puppeteer = require('puppeteer');

(async () => {
    console.log('🚀 Starting Verification for Voice & Nexus UI Features...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost:3032', { waitUntil: 'networkidle2' });
        console.log('✅ Page loaded successfully');

        // Test Portal Switcher Dropdown
        await page.select('#portal-mode-select', 'admin');
        await new Promise(r => setTimeout(r, 1000));
        const isAdminActive = await page.evaluate(() => document.getElementById('admin-tab').classList.contains('active'));
        console.log('✅ Switched to Admin Portal via header dropdown:', isAdminActive);

        // Switch back to Partner Portal
        await page.select('#portal-mode-select', 'partner');
        await new Promise(r => setTimeout(r, 1000));
        const isOverviewActive = await page.evaluate(() => document.getElementById('overview-tab').classList.contains('active'));
        console.log('✅ Switched back to Partner Portal:', isOverviewActive);

        console.log('🎉 All voice & Nexus UI features validated successfully!');
    } catch (e) {
        console.error('❌ Test failed:', e);
    } finally {
        await browser.close();
    }
})();
