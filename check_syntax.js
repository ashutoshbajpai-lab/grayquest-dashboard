const fs = require('fs');

try {
    const code = fs.readFileSync('/Users/ashutoshbajpai/.gemini/antigravity/scratch/grayquest-dashboard/app.js', 'utf8');
    new Function(code);
    console.log('✅ app.js Syntax Check PASSED - No syntax errors in JavaScript!');
} catch (e) {
    console.error('❌ app.js Syntax Error:', e.message);
}
