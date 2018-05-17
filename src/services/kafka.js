import kafka from 'kafka-node'
import {Kafka as KafkaConfig} from '../config'
// const env = process.env.NODE_ENV || 'development'

const options = KafkaConfig.options
const topics = KafkaConfig.topics
export const ConsumerGroup = new kafka.ConsumerGroup(options, topics)
