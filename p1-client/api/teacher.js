import { BASE_PATH_JSON_SERVER, BASE_PATH } from '../utils/constants'
import { authFetch } from '../utils/fetch'

export async function getTeachers() {
  try {
    const url = `${BASE_PATH}/profesors`

    const response = await fetch(url, null)
    const result = await response.json()
    return result
  } catch (error) {
    return null
  }
}

export async function getTeacherByUserId(id) {
  try {
    const url = `${BASE_PATH}/profesors?users_permissions_user._id=${id}`
    const response = await fetch(url, null)
    const result = await response.json()
    return result
  } catch (error) {
    return null
  }
}

export async function getTeacher(id) {
  try {
    const url = `${BASE_PATH}/profesors/${id}`

    const response = await fetch(url, null)
    const result = await response.json()
    return result
  } catch (error) {
    return null
  }
}

export async function createTeacher(teacher, logout) {
  try {
    const url = `${BASE_PATH}/profesors`
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacher),
    }
    const result = await authFetch(url, params, logout)
    return result ? result : null
  } catch (error) {
    return null
  }
}
