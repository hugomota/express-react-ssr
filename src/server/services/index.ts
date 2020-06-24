import axios from 'axios'

export const apiService = axios.create({ baseURL: '/api', timeout: 6000 })
export const cxService = axios.create({ baseURL: 'http://localhost:3001' })
export const dbService = axios.create({ baseURL: 'http://localhost:3002' })
