import fetch from 'node-fetch'
// import { takeScreenshot } from "./screenshot.js";

const url = 'https://m.netdania.com/currencies/USDBRL/idc_lite'

const requestCurrentQuoteFromNetdaniaPage = async () => {
  try {
    const response = await fetch(url)

    if (response.ok) {
      return await response.text()
    } else {
      console.log(
        'Erro ao obter a taxa de câmbio. Código de resposta:',
        response.status,
      )
      return null
    }
  } catch (error) {
    console.error('Erro ao obter a taxa de câmbio:', error)
    return null
  }
}

const getCurrentQuoteFromHTML = (page) => {
  if (!page) {
    return null
  }

  const startIndex =
    page.indexOf('<span id="recid-1-f6">') + '<span id="recid-1-f6">'.length
  const endIndex = page.indexOf('</span>', startIndex)
  return page.substring(startIndex, endIndex).trim()
}

export const getCurrentQuota = async () => {
  const page = await requestCurrentQuoteFromNetdaniaPage()
  const currentQuoteText = getCurrentQuoteFromHTML(page)

  if (!currentQuoteText || !currentQuoteText.includes('/')) {
    return 0
  }

  const values = currentQuoteText.split('/')
  const currentQuoteBuy = values[0]
  const currentQuoteSalle = currentQuoteBuy.slice(0, -3) + values[1]

  // const screenshot = await takeScreenshot(url);

  return {
    text: currentQuoteText,
    buy: parseFloat(currentQuoteBuy),
    salle: parseFloat(currentQuoteSalle),
    // screenshot
  }
}
