const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {

    try {

        const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });

        const page = await browser.newPage()

        await page.goto('https://www.nytimes.com/games/wordle/')

        const localStorage = await page.evaluate(() => Object.assign({}, window.localStorage));

        const state = JSON.parse(localStorage["nyt-wordle-state"])

        console.log("Solution today is ::" + state?.solution)

        await browser.close();

        return {
            statusCode: 200,
            body: JSON.stringify({ok: true, solution: state?.solution})
        }

    } catch (e) {
        console.error("Unable to fetch the solution")
        console.error(e)
        return {
            statusCode: 500,
            body: JSON.stringify({ok: false, solution: "Oops, try refreshing the page.", e: e})
        }
    }

}