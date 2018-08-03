const puppeteer = require('puppeteer');
const fs = require('fs');

const scraperFunc = async (callbackFunc, url, position) => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  let count = 1;
  console.log('about to navigate', count);
  count++;
  await page.goto(url);
  console.log('navigated')
  await page.waitFor(1000);
  const result = await page.evaluate(callbackFunc, position)
  browser.close();
  if (position) {
    for (let i = 0; i < result.length; i++) {
      result[i].position = position;
    }
  }
  return result;
}

const writeOneFile = (location, obj) => {
  fs.writeFile(location, JSON.stringify(obj, null, 2), 'utf-8', function (err) {
    if (err) throw err;
    console.log('Saved!');
  })
}

async function writeFiles (func, urls, path) {
  const results = await func(urls);
  await writeOneFile(path, results);
}

module.exports = {scraperFunc, writeFiles}
