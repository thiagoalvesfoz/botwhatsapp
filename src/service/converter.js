import { getCurrentQuota } from '../gateways/netdania.js'
import { getGroupByFrom } from '../gateways/repository.js'

export const converter = {
  toUSD({ amount = 1.0, exchange = 1.0 }) {
    if (isNaN(amount) || amount < 1) return null
    return amount / exchange
  },
  toBRL({ amount = 1.0, exchange = 1.0 }) {
    if (isNaN(amount) || amount < 1) return null
    return amount * exchange
  },
}

export const exchangeRate = {
  async getTaxByGroup({ groupInfo }) {
    const group = getGroupByFrom(groupInfo)
    const currentQuote = await getCurrentQuota()
    return currentQuote.salle + group.tax
  },
}
