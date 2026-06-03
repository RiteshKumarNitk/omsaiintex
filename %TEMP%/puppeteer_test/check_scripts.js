
const fs = require('fs');
const acorn = require('acorn');
const html = fs.readFileSync('c:/Users/RiteshKumar/Downloads/omsaiintex.com/omsaiintex.com/homepage/index.html', 'utf8');
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
    const code = match[1].trim();
    if (code) {
        try {
            acorn.parse(code, { ecmaVersion: 2020 });
        } catch (e) {
            console.log('--- SYNTAX ERROR ---');
            console.log(e.message);
            console.log(code.substring(0, 100) + '...');
        }
    }
}

