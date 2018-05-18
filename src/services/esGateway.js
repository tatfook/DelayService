import axios from 'axios'
import { esGateWay as esGatewayConfig, MasterToken } from '../config'

const client = axios.create(esGatewayConfig)

// TODO
// FIXME, should pass token through the options parameter
const tokenConfig = () => {
  return { headers: { Authorization: 'Bearer ' + MasterToken.keepwork } }
}

export const search = async options => {
  const result = await client.post('es/search', options, tokenConfig())
  return result.data
}

export const submitGitData = async (path, action, content, options) => {
  return client.post('git/commit', {path, action, content, options}, tokenConfig())
}

export default {
  search,
  submitGitData
}
