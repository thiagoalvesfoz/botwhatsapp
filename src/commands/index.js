import { currencyConverter } from './currency_converter.js'
import { dollarQuota } from './dollar_quota.js'
import { dolarRate } from './dollar_rate.js'
import { info } from './info_group.js'
import { ping } from './ping.js'

export const commands = [
  {
    flag: '#TX',
    action: dolarRate,
  },
  {
    flag: '#INFO',
    action: info,
  },
  {
    flag: '#DOLLAR',
    action: dollarQuota,
  },
  {
    flag: '#BT',
    action: currencyConverter,
  },
  {
    flag: '#PING',
    action: ping,
  },
]

export function getAction({ flag }) {
  if (!flag || !flag.toUpperCase().startsWith('#')) {
    console.log('the message is not a flag')
    return
  }

  if (flag.includes(' ')) {
    flag = flag.split(' ')[0]
  }

  const command = commands.find((command) => command?.flag === flag.toUpperCase())
  if (!command) {
    console.log('command not found')
    return
  }

  return command.action
}


