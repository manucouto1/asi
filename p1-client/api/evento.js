import { BASE_PATH } from '../utils/constants'
import axios from 'axios'

export async function findEvento(id) {
  try {
    const url = `${BASE_PATH}/eventos/${id}`
    const response = await fetch(url, null)
    const result = await response.json()
    return result ? result : null
  } catch (error) {
    return null
  }
}

export async function deleteEvento(id) {
  const url = `${BASE_PATH}/eventos/${id}`

  return await axios.delete(url)
}

export async function createEvent(event, logout) {
  try {
    const url = `${BASE_PATH}/eventos`
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }
    // const result = await authFetch(url, params, logout);
    const response = await fetch(url, params)
    const result = await response.json()
    return result ? result : null
  } catch (error) {
    return null
  }
}
