// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const puppeteer = require('puppeteer');

export default async function handler(req, res) {

    const browser = await puppeteer.launch()

    const page = await browser.newPage()

    await page.goto('https://www.nytimes.com/games/wordle/', {waitUntil: 'networkidle0'})

    const localStorage = await page.evaluate(() => Object.assign({}, window.localStorage));

    const state = JSON.parse(localStorage["nyt-wordle-state"])

    console.log("Solution today is ::" + state.solution)

    res.setHeader('Cache-Control', 's-maxage=86400');

    return res.status(200).json({solution: state.solution})

}
