import { ConsumerGroup } from './services/kafka'
import { mainRouter } from './routes/main-routes'
import { errorRouter } from './routes/error-routes'

// const env = process.env.NODE_ENV || 'development'

ConsumerGroup.on('error', errorRouter)
ConsumerGroup.on('message', mainRouter)

export default ConsumerGroup
