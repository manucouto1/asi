import { BASE_PATH_JSON_SERVER, BASE_PATH } from '../utils/constants'

export async function getAllHorarios() {
  try {
    const url = `${BASE_PATH}/horarios`

    const response = await fetch(url, null)
    const result = await response.json()
    return result
  } catch (error) {
    return null
  }
}

export async function getAllEvents() {
  try {
    const url = `${BASE_PATH}/eventos`

    const response = await fetch(url, null)
    const result = await response.json()
    return result
  } catch (error) {
    return null
  }
}
