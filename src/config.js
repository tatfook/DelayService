export const Kafka = {
  options: {
    kafkaHost: process.env.KAFKA_KAFKAHOST,
    fromOffset: process.env.KAFKA_FROMOFFSET,
    groupId: process.env.KAFKA_CONSUMER_GROUPID
  },
  topics: process.env.KAFKA_TOPICS
}

export const Redis = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
}

export const Git = {
  url: process.env.GITLAB_API_PREFIX,
  token: process.env.GITLAB_MASTER_TOKEN
}

export const esGateWay = {
  baseURL: process.env.ES_GATEWAY_BASE_URL
}

export const MasterToken = {
  keepwork: process.env.KEEPWORK_MASTER_TOKEN
}
