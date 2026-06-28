const puppeteer = require('puppeteer');

(async () => {
    let browser;
    try {
        console.log('--- Starting Comprehensive QA Test ---');
        browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });

        page.on('console', msg => {
            if (msg.type() === 'error') console.log(`[BROWSER ERROR]: ${msg.text()}`);
        });
        page.on('pageerror', error => console.log(`[PAGE ERROR]: ${error.message}`));

        console.log('1. Loading Dashboard...');
        await page.goto('http://localhost:3031', { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 1000)); // wait for CSS animations

        // Helper to check visibility
        const isVisible = async (selector) => {
            return await page.evaluate((sel) => {
                const el = document.querySelector(sel);
                if (!el) return false;
                const style = window.getComputedStyle(el);
                return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
            }, selector);
        };

        // Test 1: Overview Tab
        console.log('2. Testing Overview Tab Data...');
        const isOverviewVisible = await isVisible('#overview-tab');
        if (!isOverviewVisible) throw new Error('Overview tab is not visible by default.');
        const gmvBarChart = await page.$('#monthlyGmvChart');
        if (!gmvBarChart) throw new Error('GMV Bar Chart canvas missing.');
        console.log('   ✓ Overview Tab and Charts validated.');

        // Test 2: Sidebar Accordion
        console.log('3. Testing Sidebar Accordion (Institutes)...');
        await page.click('.menu-parent[data-expand="institutes"]');
        await new Promise(r => setTimeout(r, 500)); // wait for transition
        const isSubmenuVisible = await isVisible('.sidebar-submenu');
        if (!isSubmenuVisible) throw new Error('Institutes submenu did not expand.');
        console.log('   ✓ Sidebar Accordion expands successfully.');

        // Test 3: Institutes Sub-tab navigation
        console.log('4. Testing Institute Details Tab...');
        await page.click('a[data-tab="inst-details"]');
        await new Promise(r => setTimeout(r, 500));
        const isInstTabVisible = await isVisible('#inst-details-subtab');
        if (!isInstTabVisible) throw new Error('Institute Details tab did not become visible.');
        const rowsCount = await page.evaluate(() => document.querySelectorAll('#institutes-table-body tr').length);
        if (rowsCount === 0) throw new Error('Institutes table is empty.');
        console.log(`   ✓ Institute Details loaded with ${rowsCount} rows.`);

        // Test 4: Full Page Drilldown
        console.log('5. Testing Institute Drilldown View...');
        await page.click('#institutes-table-body tr:first-child');
        await new Promise(r => setTimeout(r, 500));
        const isDrilldownVisible = await isVisible('#inst-drilldown-tab');
        if (!isDrilldownVisible) throw new Error('Drilldown view did not open.');
        const instName = await page.evaluate(() => document.getElementById('dr-inst-name').innerText);
        if (!instName || instName.trim() === '') throw new Error('Drilldown data not populated.');
        console.log(`   ✓ Drilldown view opened successfully for: ${instName}`);

        // Test 5: Drilldown Back Button
        console.log('6. Testing Drilldown Back Navigation...');
        await page.click('#btn-back-to-institutes');
        await new Promise(r => setTimeout(r, 500));
        const isDrilldownGone = !(await isVisible('#inst-drilldown-tab'));
        if (!isDrilldownGone) throw new Error('Back button did not close drilldown.');
        console.log('   ✓ Back navigation successful.');

        // Test 6: API Webhooks Modal
        console.log('7. Testing Webhooks Modal & Configuration...');
        await page.click('a[data-tab="inst-api"]');
        await new Promise(r => setTimeout(r, 600));
        // Click the first dynamically-generated "Configure" button in the API table
        await page.click('#api-gile-table-body tr:first-child button');
        await new Promise(r => setTimeout(r, 500));
        const isModalVisible = await isVisible('#webhook-modal.show');
        if (!isModalVisible) throw new Error('Webhook modal did not appear.');
        await page.click('#btn-close-webhook-modal');
        await new Promise(r => setTimeout(r, 500));
        const isModalGone = !(await isVisible('#webhook-modal.show'));
        if (!isModalGone) throw new Error('Webhook modal did not close.');
        console.log('   ✓ Webhook Modal flow verified.');

        // Test 7: Settlements Tab
        console.log('8. Testing Settlements Tab...');
        await page.click('a[data-tab="settlements"]');
        await new Promise(r => setTimeout(r, 500));
        const settlementsRows = await page.evaluate(() => document.querySelectorAll('#settlements-table-body tr').length);
        if (settlementsRows === 0) throw new Error('Settlements table is empty.');
        console.log(`   ✓ Settlements tab verified with ${settlementsRows} records.`);

        console.log('--- All QA Tests Passed Successfully! ---');

    } catch (e) {
        console.error('\n❌ QA TEST FAILED:');
        console.error(e.message);
    } finally {
        if (browser) await browser.close();
    }
})();
