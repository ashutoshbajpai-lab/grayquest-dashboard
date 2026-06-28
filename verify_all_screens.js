const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR = '/Users/ashutoshbajpai/.gemini/antigravity/brain/160ab24e-5fc3-4171-8338-93d108f4af2f';

(async () => {
    let browser;
    try {
        console.log('--- Starting Verification Script ---');
        browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });

        let errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log(`[BROWSER ERROR]: ${msg.text()}`);
                errors.push(msg.text());
            }
        });
        page.on('pageerror', error => {
            console.log(`[PAGE ERROR]: ${error.message}`);
            errors.push(error.message);
        });

        // Load the page
        await page.goto('http://localhost:3031', { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 1000));

        // Click a tab and take screenshot helper
        const verifyTab = async (tabName, clickSelector, activeViewSelector, tableSelector = null) => {
            console.log(`Verifying ${tabName} Tab...`);
            if (clickSelector) {
                await page.click(clickSelector);
                await new Promise(r => setTimeout(r, 800));
            }
            
            // Check visibility
            const isTabVisible = await page.evaluate((sel) => {
                const el = document.querySelector(sel);
                if (!el) return false;
                const style = window.getComputedStyle(el);
                return style && style.display !== 'none' && style.visibility !== 'hidden';
            }, activeViewSelector);

            if (!isTabVisible) {
                throw new Error(`Tab ${tabName} (selector: ${activeViewSelector}) is not visible`);
            }

            // Check table/list rows if requested
            if (tableSelector) {
                const rows = await page.evaluate((sel) => {
                    return document.querySelectorAll(sel).length;
                }, tableSelector);
                if (rows === 0) {
                    throw new Error(`Tab ${tabName} has empty table/list: ${tableSelector}`);
                }
                console.log(`   ✓ ${tabName} table has ${rows} rows.`);
            }

            const screenshotPath = path.join(ARTIFACT_DIR, `screenshot_${tabName.toLowerCase().replace(/ /g, '_')}.png`);
            await page.screenshot({ path: screenshotPath });
            console.log(`   ✓ Screenshot saved: ${screenshotPath}`);
        };

        // 1. Overview
        await verifyTab('Overview', null, '#overview-tab');

        // 2. Expand Institutes Accordion
        console.log('Expanding Institutes accordion...');
        await page.click('.menu-parent[data-expand="institutes"]');
        await new Promise(r => setTimeout(r, 500));

        // 3. Institute Details
        await verifyTab('Institute Details', 'a[data-tab="inst-details"]', '#inst-details-subtab', '#institutes-table-body tr');

        // Click into a GILE row for Drilldown
        console.log('Testing GILE Drilldown...');
        await page.click('#institutes-table-body tr:first-child');
        await new Promise(r => setTimeout(r, 800));
        await verifyTab('Institute Drilldown', null, '#inst-drilldown-tab');

        // Go Back
        console.log('Navigating back from Drilldown...');
        await page.click('#btn-back-to-institutes');
        await new Promise(r => setTimeout(r, 500));

        // 4. Onboarding Pipeline
        await verifyTab('Onboarding Pipeline', 'a[data-tab="inst-pipeline"]', '#inst-pipeline-subtab', '#pipeline-progress-list .pipeline-item');

        // 5. Onboarding Requests
        await verifyTab('Onboarding Requests', 'a[data-tab="inst-request"]', '#inst-request-subtab');

        // 6. API Webhooks
        await verifyTab('API Webhooks', 'a[data-tab="inst-api"]', '#inst-api-subtab', '#api-gile-table-body tr');

        // 7. Transactions
        await verifyTab('Transactions Listing', 'a[data-tab="transactions"]', '#transactions-tab', '#tx-table-body tr');

        // 8. Settlements
        await verifyTab('Settlements', 'a[data-tab="settlements"]', '#settlements-tab', '#settlements-table-body tr');

        // 9. Commissions
        await verifyTab('Commissions', 'a[data-tab="commissions"]', '#commissions-tab', '#comm-tx-table-body tr');

        // 10. Products Configurator
        await verifyTab('Products Configurator', 'a[data-tab="products"]', '#products-tab', '#products-gile-table-body tr');

        // 11. Support Desk
        await verifyTab('Support Desk', 'a[data-tab="support"]', '#support-tab', '#support-tickets-list .ticket-item');

        console.log('--- All tab navigations and data population checks verified! ---');
        console.log('Total Browser Errors:', errors.length);

    } catch (e) {
        console.error('\n❌ VERIFICATION FAILED:');
        console.error(e.message);
    } finally {
        if (browser) await browser.close();
    }
})();
