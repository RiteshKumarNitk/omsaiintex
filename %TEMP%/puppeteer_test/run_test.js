const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message, '\nSTACK:', err.stack));
  await page.goto('file:///C:/Users/RiteshKumar/Downloads/omsaiintex.com/omsaiintex.com/homepage/index.html', { waitUntil: 'networkidle2' });
  await browser.close();
})();
