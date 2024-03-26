import { VenomBot } from '../venom.js'
import { getGroupByFrom } from '../gateways/repository.js'

export const info = {
  async exec({ from, groupInfo }) {
    const venombot = await VenomBot.getInstance()

    const group = getGroupByFrom(groupInfo)

    const reply =
      'ℹ️ *Informações do grupo*\n\n' +
      '-----------------------------------\n' +
      `*ID:* ${group.id}\n` +
      '-----------------------------------\n' +
      `*GROUP NAME:* ${group.group_name}\n` +
      '-----------------------------------\n' +
      `*CODE:* ${group.code}\n` +
      '-----------------------------------\n' +
      `*TAX:* ${group.tax}\n` +
      '-----------------------------------\n' +
      '🔔 _mensagem automática_'

    await venombot.sendText({ to: from, message: reply })
  },
}
