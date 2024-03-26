import { converter, exchangeRate } from '../service/converter.js'
import { coin } from '../service/currency.js'
import { messages } from '../service/messages.js'
import { storage } from '../db/storage.js'
import { getAmmount } from '../utils.js'

export const currencyConverter = {
  async exec({ from, message }) {
    const amount = getAmmount(message)

    if (!amount) {
      return await messages.invalidNumberFormat({ to: from })
    }

    storage[from] = {
      stage: 1,
      amount,
    }

    messages.askCoin({ to: from })
  },
}

export const convert = {
  async exec({ from, message, groupInfo }) {
    const store = storage[from]

    console.log(`get storage`, store)

    const exchange = await exchangeRate.getTaxByGroup({ groupInfo })

    let total = 0
    let props = {
      exchange,
    }

    if (message === coin.BRL) {
      total = converter.toBRL({ amount: store.amount, exchange })
      props = { ...props, brl: total, usd: store.amount }
    } else {
      total = converter.toUSD({ amount: store.amount, exchange })
      props = { ...props, usd: total, brl: store.amount }
    }

    storage[from] = {
      stage: 0,
    }

    await messages.success({ to: from, props })
  },
}
