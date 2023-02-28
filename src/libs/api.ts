import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-todos-psi.vercel.app',
})
