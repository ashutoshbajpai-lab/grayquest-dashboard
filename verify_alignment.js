const puppeteer = require('puppeteer');

(async () => {
    console.log('🚀 Checking Table Column Alignment for Transactions and Settlements...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost:3032', { waitUntil: 'networkidle2' });

        // Check Transactions table alignment
        await page.click('a[data-tab="transactions"]');
        await new Promise(r => setTimeout(r, 1000));
        
        const txHeadCount = await page.evaluate(() => document.querySelectorAll('#tx-table thead th, #tx-table thead td').length);
        const txBodyCellCount = await page.evaluate(() => document.querySelector('#tx-table tbody tr.grouped-header-tr').children.length);
        console.log(`✅ Transactions Table: Header Columns = ${txHeadCount}, Row Cells = ${txBodyCellCount}`);

        // Check Settlements table alignment
        await page.click('a[data-tab="settlements"]');
        await new Promise(r => setTimeout(r, 1000));

        const setHeadCount = await page.evaluate(() => document.querySelectorAll('#settlements-table thead th').length);
        const setBodyCellCount = await page.evaluate(() => document.querySelector('#settlements-table tbody tr.grouped-header-tr').children.length);
        console.log(`✅ Settlements Table: Header Columns = ${setHeadCount}, Row Cells = ${setBodyCellCount}`);

        if (txHeadCount === txBodyCellCount && setHeadCount === setBodyCellCount) {
            console.log('🎉 PERFECT ALIGNMENT CONFIRMED FOR BOTH TABLES!');
        } else {
            console.error('❌ Column mismatch detected!');
        }

    } catch (e) {
        console.error('❌ Test error:', e);
    } finally {
        await browser.close();
    }
})();
