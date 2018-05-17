export let Kafka = {
  options: {
    kafkaHost: 'localhost:9092', // Kafka地址端口
    fromOffset: 'earliest', // 起始Offset
    groupId: 'ExampleTestGroup' // 消费者组id
  },
  topics: 'test' // 所消费topic
}

export let Redis = {
  host: 'localhost', // redis地址
  port: 6379 // redis端口号
}
