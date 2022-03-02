// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');


export default async function handler(req, res) {

    try {
        const browser = await puppeteer.launch({
            executablePath: await chromium.executablePath
        })

        const page = await browser.newPage()

        await page.goto('https://www.nytimes.com/games/wordle/')

        const localStorage = await page.evaluate(() => Object.assign({}, window.localStorage));

        const state = JSON.parse(localStorage["nyt-wordle-state"])

        console.log("Solution today is ::" + state?.solution)

        res.setHeader('Cache-Control', 's-maxage=86400');

        return res.status(200).json({ok: true, solution: state?.solution})
    } catch (e) {
        return res.status(500).send({ok: true, error: e})
    }

}
