import kafka from 'kafka-node'
import {Kafka as KafkaConfig} from '../config'

const options = KafkaConfig.options
const topics = KafkaConfig.topics
export const ConsumerGroup = new kafka.ConsumerGroup(options, topics)

export const parseMessage = message => {
  message.value = JSON.parse(message.value)
  let topic = message.topic
  let action = message.value.action || undefined
  return [topic, action]
}
