https://github.com/CodeDraken/puppeteer-example/blob/master/index.js
https://medium.com/swlh/an-introduction-to-web-scraping-with-puppeteer-3d35a51fdca0
https://github.com/emadehsan/thal
https://codeburst.io/a-guide-to-automating-scraping-the-web-with-javascript-chrome-puppeteer-node-js-b18efb9e9921
https://github.com/GoogleChrome/puppeteer/issues/782
https://github.com/stereobooster/react-snap/issues/199
https://github.com/peterbe/minimalcss/issues/213
https://github.com/GoogleChrome/puppeteer/issues/2504


const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--start-maximized' // you can also use '--start-fullscreen'
        ]
    });
    const page = await browser.newPage();
    //await page.setViewport({width: 1000, height: 500});
    await page.goto('https://batdongsan.com.vn', { waitUntil: "networkidle2", "timeout": 3000000 });
    await page.waitForSelector('img[class=product-avatar-img]');
    //await page.screenshot({path: 'pic.png'});

    // grab team data
    const teams = await page.evaluate(() => {

        // our selectors
        const HYPERLINK_ROW_SELECTOR = 'a.product-avatar';
        const IMAGE_ROW_SELECTOR = 'img.product-avatar-img';

        const grabFromRow = (row, classname) => row.querySelector(`img.${classname}`).getAttribute('src');

        // we'll store our data in an array of objects
        const data = [];

        // get all team rows
        const teamRows = document.querySelectorAll(HYPERLINK_ROW_SELECTOR)

        // loop over each team row, creating objects
        for (const tr of teamRows) {
            data.push({ image: grabFromRow(tr, 'product-avatar-img') });
        }

        // send the data back into the teams variable
        return data
    })

    // log the data for testing purposes
    console.log(JSON.stringify(teams, null, 2))


    //await browser.close();
})();


