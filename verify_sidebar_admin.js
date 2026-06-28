const puppeteer = require('puppeteer');

(async () => {
    console.log('🚀 Testing Sidebar Onboarding Admin Configurator Menu Item...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost:3032', { waitUntil: 'networkidle2' });
        
        // Click the sidebar Onboarding Admin Configurator link
        await page.click('#sidebar-menu-admin-configurator');
        await new Promise(r => setTimeout(r, 1000));
        
        const isAdminActive = await page.evaluate(() => document.getElementById('admin-tab').classList.contains('active'));
        console.log('✅ Sidebar Onboarding Admin Configurator opens Admin tab cleanly:', isAdminActive);

        if (isAdminActive) {
            console.log('🎉 SIDEBAR ONBOARDING ADMIN CONFIGURATOR SECTION CONFIRMED!');
        }
    } catch (e) {
        console.error('❌ Test error:', e);
    } finally {
        await browser.close();
    }
})();
