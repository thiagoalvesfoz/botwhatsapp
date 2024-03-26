import { VenomBot } from '../venom.js'
import { formatCurrency } from '../utils.js'
import { coin } from './currency.js'

export const messages = {
  async askCoin({ to }) {
    const venombot = await VenomBot.getInstance()

    const title = 'Conversor Monetário'
    const description = 'Para qual moeda você gostaria fazer a conversão?'
    const buttons = [
      {
        buttonText: {
          displayText: coin.USD,
        },
      },
      {
        buttonText: {
          displayText: coin.BRL,
        },
      },
    ]
    await venombot.sendButtons({ to, title, buttons, description })
  },
  async invalidNumberFormat({ to }) {
    const venombot = await VenomBot.getInstance()

    const message =
      'Formato de número inválido\n\n' +
      '_Exemplos de entradas aceitas_\n\n' +
      '✅ #TX \n' +
      '✅ #TX 1 \n' +
      '✅ #TX 1.0 \n' +
      '✅ #TX 500000 \n\n' +
      '✅ #TX 500200.56 \n\n' +
      '_Exemplos entradas não aceitas_ \n\n' +
      '❌ #TX letras \n' +
      '❌ #TX 1,0 (vírgula) \n' +
      '❌ #TX 500.000,00 \n\n' +
      '❌ #TX 500.200.56 \n\n' +
      '🔔 _mensagem automática_'

    await venombot.sendText({ to, message })
  },
  async success({ to, props }) {
    const venombot = await VenomBot.getInstance()

    const { exchange, usd, brl } = props

    const reply =
      '*Cotação do Dólar em Tempo Real*\n\n' +
      `*USD/BRL:* ${exchange.toFixed(4)}\n` +
      '*fonte:* netdania.com\n' +
      '-----------------------------------\n' +
      `${formatCurrency({
        amount: usd,
        currency: 'USD',
      })}\n` +
      '-----------------------------------\n' +
      `${formatCurrency({
        amount: brl,
        currency: 'BRL',
      })}\n` +
      '-----------------------------------\n' +
      `🗓️ ${new Date().toLocaleString()}\n\n` +
      '🔔 _mensagem automática_'

    await venombot.sendText({ to, message: reply })
  },
}
