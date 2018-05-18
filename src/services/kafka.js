import kafka from 'kafka-node'
import {Kafka as KafkaConfig} from '../config'

// return a kafka consumerGroup client
const options = KafkaConfig.options
const topics = KafkaConfig.topics
export const ConsumerGroup = new kafka.ConsumerGroup(options, topics)

// parse topic and action from the message
export const parseMessage = message => {
  try {
    message.value = JSON.parse(message.value)
    let topic = message.topic
    let action = message.value.action || undefined
    return [topic, action]
  } catch (e) {
    console.log('fail to parse message')
    console.log(message)
    return [undefined, undefined]
  }
}
