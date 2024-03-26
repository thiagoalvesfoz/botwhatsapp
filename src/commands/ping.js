import { VenomBot } from '../venom.js'

export const ping = {
  async exec({ from }) {
    const venombot = await VenomBot.getInstance()

    const response = '🏓 Pong!'

    await venombot.sendText({ to: from, message: response })
  },
}
