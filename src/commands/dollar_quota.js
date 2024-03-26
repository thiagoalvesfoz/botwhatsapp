import { VenomBot } from '../venom.js'
import { getCurrentQuota } from '../gateways/netdania.js'

export const dollarQuota = {
  async exec({ from }) {
    const venombot = await VenomBot.getInstance()
    const currentQuote = await getCurrentQuota()

    const reply = `
    👋 Olá, como vai? 
    Veja a cotação atual para USD/BRL.
    -----------------------------------
    *COMPRA:* ${currentQuote.buy}
    *VENDA:* ${currentQuote.salle}
    *fonte:* netdania
    -----------------------------------
    🗓️ ${new Date().toLocaleString()}
    `

    await venombot.sendText({ to: from, message: reply })
  },
}
