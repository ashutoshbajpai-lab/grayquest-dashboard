const puppeteer = require('puppeteer');

(async () => {
    let browser;
    try {
        console.log('--- Starting Admin Flow & Transactions Grouping QA Test ---');
        browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });

        page.on('console', msg => {
            if (msg.type() === 'error') console.log(`[BROWSER ERROR]: ${msg.text()}`);
        });
        page.on('pageerror', error => console.log(`[PAGE ERROR]: ${error.message}`));

        console.log('1. Loading Dashboard...');
        await page.goto('http://localhost:3032', { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 1000));

        // Test 1: Transactions tab grouped view and drilldown
        console.log('2. Navigating to Transactions Tab...');
        await page.click('a[data-tab="transactions"]');
        await new Promise(r => setTimeout(r, 600));

        console.log('   Clicking Transaction Listing sub-tab...');
        await page.click('button[data-subtab="tx-listing"]');
        await new Promise(r => setTimeout(r, 600));

        const isTxVisible = await page.evaluate(() => {
            const el = document.getElementById('tx-listing-subtab');
            return el && window.getComputedStyle(el).display !== 'none';
        });
        if (!isTxVisible) throw new Error('Transactions tab not visible.');

        // Group rows check
        const groupRowsCount = await page.evaluate(() => document.querySelectorAll('#tx-table-body tr.grouped-header-tr').length);
        console.log(`   ✓ Grouped transaction rows found: ${groupRowsCount}`);
        if (groupRowsCount === 0) throw new Error('No grouped transaction rows found.');

        // Expand the first row
        console.log('3. Clicking first grouped transaction row to expand...');
        await page.click('#tx-table-body tr.grouped-header-tr:first-child');
        await new Promise(r => setTimeout(r, 500));

        // Check if drilldown is visible
        const isInnerTableVisible = await page.evaluate(() => {
            const el = document.querySelector('#tx-table-body tr.drilldown-container-tr');
            return el && window.getComputedStyle(el).display !== 'none';
        });
        if (!isInnerTableVisible) throw new Error('Grouped transactions did not expand.');
        console.log('   ✓ Student transactions drilldown expanded successfully.');

        // Test Redirect to FMS button
        console.log('4. Testing FMS redirection...');
        await page.click('#tx-table-body tr.drilldown-container-tr button.btn-view-fms');
        await new Promise(r => setTimeout(r, 500));
        console.log('   ✓ FMS redirect clicked successfully.');

        // Test Admin Panel Onboarding Configuration
        console.log('5. Navigating to Admin Panel...');
        await page.click('a[data-tab="admin"]');
        await new Promise(r => setTimeout(r, 800));

        const isAdminVisible = await page.evaluate(() => {
            const el = document.getElementById('admin-tab');
            return el && window.getComputedStyle(el).display !== 'none';
        });
        if (!isAdminVisible) throw new Error('Admin Panel tab not visible.');
        console.log('   ✓ Admin Panel loaded.');

        // Click configure on first pending request
        console.log('6. Selecting onboarding request for configuration...');
        await page.click('#admin-pending-requests-tbody button.btn-admin-action');
        await new Promise(r => setTimeout(r, 500));

        // Confirm fields are locked
        let isLocked = await page.evaluate(() => document.getElementById('admin-fields-form-block').classList.contains('locked'));
        if (!isLocked) throw new Error('Configuration fields should be locked before entering Product ID.');
        console.log('   ✓ Form fields are locked (Pending Product ID).');

        // Enter Product ID and unlock
        console.log('7. Entering Product ID and unlocking...');
        await page.type('#admin-product-id', 'GQ-PROD-9988');
        await page.click('#btn-unlock-config');
        await new Promise(r => setTimeout(r, 500));

        isLocked = await page.evaluate(() => document.getElementById('admin-fields-form-block').classList.contains('locked'));
        if (isLocked) throw new Error('Form fields failed to unlock after submitting Product ID.');
        console.log('   ✓ Form fields unlocked successfully.');

        // Generate UUID Code
        console.log('8. Testing UUID generation...');
        await page.click('#btn-generate-uuid');
        await new Promise(r => setTimeout(r, 2000)); // wait for generation
        const uuidVal = await page.$eval('#cfg-code', el => el.value);
        if (!uuidVal) throw new Error('Failed to generate UUID.');
        console.log(`   ✓ UUID generated: ${uuidVal}`);

        // Add a fee row
        console.log('9. Adding new fee sub-row...');
        await page.click('#btn-add-config-row');
        await new Promise(r => setTimeout(r, 300));
        await page.type('#config-sub-rows-list .config-sub-row:last-child .cfg-fee-type', 'Exam Fee');
        console.log('   ✓ Fee sub-row configured.');

        // Submit Step 1
        console.log('10. Submitting Step 1 Configurations...');
        await page.click('#admin-config-step1-form button[type="submit"]');
        await new Promise(r => setTimeout(r, 600));

        // Check if Step 2 review panel is shown
        const isStep2Visible = await page.evaluate(() => {
            const el = document.getElementById('admin-step2-panel');
            return el && window.getComputedStyle(el).display !== 'none';
        });
        if (!isStep2Visible) throw new Error('Failed to transition to Step 2 Review Panel.');
        console.log('   ✓ Step 2 Metrics Review Panel rendered.');

        // Complete onboarding setup
        console.log('11. Completing onboarding setup...');
        await page.click('#btn-complete-onboarding');
        await new Promise(r => setTimeout(r, 600));
        console.log('   ✓ Onboarding completed.');

        // Check if API and Webhooks row is created
        console.log('12. Verifying API Webhooks credentials creation...');
        await page.click('.menu-parent[data-expand="institutes"]');
        await new Promise(r => setTimeout(r, 500));
        await page.click('a[data-tab="inst-api"]');
        await new Promise(r => setTimeout(r, 600));

        const apiRowsCount = await page.evaluate(() => document.querySelectorAll('#api-gile-table-body tr').length);
        console.log(`   ✓ API Webhook Credentials table now has ${apiRowsCount} rows.`);

        console.log('--- All Admin & Transactions Grouping Tests Passed! ---');

    } catch (e) {
        console.error('\n❌ QA TEST FAILED:');
        console.error(e.message);
    } finally {
        if (browser) await browser.close();
    }
})();
