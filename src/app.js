import {ConsumerGroup as app} from './services/kafka'
import mainRouter from './routes/main-routes'
import errorRouter from './routes/error-routes'

// const env = process.env.NODE_ENV || 'development'

app.on('error', errorRouter)
app.on('message', mainRouter)

export default app
