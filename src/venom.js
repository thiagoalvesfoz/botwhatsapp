import { create } from 'venom-bot'

export class VenomBot {
  #venombot
  #session

  static getInstance() {
    if (VenomBot.instance === undefined) VenomBot.instance = new VenomBot()
    return VenomBot.instance
  }

  async init(props) {
    this.#session = session
    this.#venombot = await create({
      multidevice: false,
      ...props
    })

    return this
  }

  get getSessionName() {
    return this.#session
  }

  async onMessage(callback) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.')
    return await this.#venombot.onMessage(callback)
  }

  async sendText({ to, message }) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.')
    return await this.#venombot.sendText(to, message)
  }

  // Is not working
  async sendButtons({ to, title, buttons, description }) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.')

    return await this.#venombot.sendButtons(to, title, buttons, description)
  }

  async markUnseenMessage({ to }) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.')
    return await this.#venombot.markUnseenMessage(to)
  }
}
