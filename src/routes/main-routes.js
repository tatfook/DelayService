import controllers from '../controllers/index.js'
import { parseMessage } from '../services/kafka'

export const mainRouter = message => {
  let [topic, action] = parseMessage(message)

  try {
    controllers[topic][action](message)
  } catch (e) {
    switch (e.name) {
      case 'TypeError':
        console.log(`topic "${topic}" action "${action}" do not match any method`)
        break
      default:
        console.log(e)
        break
    }
  }
}
