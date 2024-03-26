import chromium from 'chrome-aws-lambda'

export async function takeScreenshot(url) {
  let browser = null
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })

    const page = await browser.newPage()
    await page.goto(url)

    const screenshotBuffer = await page.screenshot({ encoding: 'binary' })
    const base64 = Buffer.from(screenshotBuffer, 'binary').toString('base64')

    return `data:image/jpg;base64,${base64}`
  } catch (error) {
    console.error('Error taking screenshot:', error)
    return null
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }
}
