import { VenomBot } from '../venom.js'
import { getCurrentQuota } from '../gateways/netdania.js'
import { getGroupByFrom } from '../gateways/repository.js'
import { formatCurrency } from '../utils.js'

const DEFAULT_AMMOUNT = 1.0

export const dolarRate = {
  async exec({ from, message, groupInfo }) {
    const venombot = await VenomBot.getInstance()

    const dolarAmount = getAmmount(message)

    if (!dolarAmount) {
      const invalidFormat =
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

      await venombot.sendText({ to: from, message: invalidFormat })
      return
    }

    const group = getGroupByFrom(groupInfo)
    const currentQuote = await getCurrentQuota()
    const exchange = currentQuote.salle + group.tax
    const total = exchange * dolarAmount

    const reply =
      '*Cotação do Dólar em Tempo Real*\n\n' +
      `*USD/BRL:* ${exchange.toFixed(4)}\n` +
      '*fonte:* netdania.com\n' +
      '-----------------------------------\n' +
      `${formatCurrency({
        amount: dolarAmount,
        currency: 'USD',
      })}\n` +
      '-----------------------------------\n' +
      `${formatCurrency({ amount: total })}\n` +
      '-----------------------------------\n' +
      `🗓️ ${new Date().toLocaleString()}\n\n` +
      '🔔 _mensagem automática_'

    await venombot.sendText({ to: from, message: reply })
  },
}

function isNumeric(num) {
  return !isNaN(num)
}

const getAmmount = (msg) => {
  const values = msg.split(' ')
  if (values.length <= 1) {
    return DEFAULT_AMMOUNT
  }

  const amount = values[1]

  if (!isNumeric(amount)) {
    return null
  }

  return amount
}
