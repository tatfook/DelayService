import redis from 'redis'
import { Redis as RedisConfig } from '../config'

// return a redis client
const client = redis.createClient(RedisConfig)
export default client
