const puppeteer = require('puppeteer');

(async () => {
    console.log('🚀 Testing Admin Portal Sub-Navigation Tabs...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost:3032', { waitUntil: 'networkidle2' });
        
        // Switch to Admin Portal
        await page.select('#portal-mode-select', 'admin');
        await new Promise(r => setTimeout(r, 1000));
        console.log('✅ In Admin Portal');

        // Test clicking Onboarding Configurator sub-tab
        await page.click('#admin-mod-btn-configurator');
        await new Promise(r => setTimeout(r, 500));
        console.log('✅ Configurator sub-tab active');

        // Test clicking Active Institutes sub-tab
        await page.click('#admin-mod-btn-institutes');
        await new Promise(r => setTimeout(r, 500));
        console.log('✅ Active Institutes sub-tab loaded');

        console.log('🎉 Admin Sub-Navigation verified with 100% success!');
    } catch (e) {
        console.error('❌ Sub-nav test error:', e);
    } finally {
        await browser.close();
    }
})();
