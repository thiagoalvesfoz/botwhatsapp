import { convert } from './commands/currency_converter.js'
import { getAction } from './commands/index.js'
import { hasStage } from './gateways/repository.js';
import { VenomBot } from './venom.js'

const chromiumArgs = [
  '--user-agent', '--disable-web-security', '--no-sandbox', '--disable-web-security',
  '--aggressive-cache-discard', '--disable-cache', '--disable-application-cache',
  '--disable-offline-load-stale-cache', '--disk-cache-size=0',
  '--disable-background-networking', '--disable-default-apps', '--disable-extensions',
  '--disable-sync', '--disable-translate', '--hide-scrollbars', '--metrics-recording-only',
  '--mute-audio', '--no-first-run', '--safebrowsing-disable-auto-update',
  '--ignore-certificate-errors', '--ignore-ssl-errors', '--ignore-certificate-errors-spki-list'
];

const main = async () => {
  try {
    const venombot = await VenomBot.getInstance().init({
      session: 'TesteBot2',
      headless: 'new',
      useChrome: false,
      disableWelcome: true,
      devtools: true,
      browserArgs: chromiumArgs,
      disableSpins: true
    })

    venombot.onMessage(async (message) => {
      if (!message.isGroupMsg) {
        return
      }

      console.log(message.groupInfo)

      if (message.type === 'buttons_response') {
        if (!hasStage({ from: message.from })) {
          return
        }

        return await convert.exec({
          from: message.from,
          message: message.body,
          groupInfo: message.groupInfo,
        })
      }

      const action = getAction({ flag: message.body, type: message.type })
      if (!action) {
        return
      }

      await action.exec({
        from: message.from,
        message: message.body,
        groupInfo: message.groupInfo,
      })
    })
  } catch (error) {
    console.error(error)
  }
}

main()
