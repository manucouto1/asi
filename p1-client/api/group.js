import { BASE_PATH } from '../utils/constants'

export async function createGroup(group, logout) {
  try {
    const url = `${BASE_PATH}/grupos`
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(group),
    }

    const response = await fetch(url, params)
    const result = await response.json()
    return result ? result : null
  } catch (error) {
    return null
  }
}

export async function findGroup(groupId) {
  try {
    const url = `${BASE_PATH}/grupos/${groupId}`

    const response = await fetch(url, null)
    const result = await response.json()
    return result
  } catch (error) {
    return null
  }
}

export async function updateGroup(grupo, logout) {
  try {
    const url = `${BASE_PATH}/grupos/${grupo._id}`
    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(grupo),
    }
    const response = await fetch(url, params)
    const result = await response.json()
    return result ? result : null
  } catch (error) {
    return null
  }
}

export async function getGroups() {
  try {
    const url = `${BASE_PATH}/grupos`
    const response = await fetch(url, null)
    const result = await response.json()
    return result
  } catch (error) {
    return null
  }
}

export async function getMyGroups() {
  const userId = sessionStorage.getItem("user_id");
  try {
    const url = `${BASE_PATH}/grupos?alumnos.users_permissions_user=${userId}`
    const response = await fetch(url, null)
    const result = await response.json()
    console.log(result)
    return result;
  } catch (error) {
    return null
  }
}

export async function getTeacherGroups() {
  const userId = sessionStorage.getItem("user_id");
  try {
    const url = `${BASE_PATH}/grupos?profesor.users_permissions_user=${userId}`
    const response = await fetch(url, null)
    const result = await response.json()
    return result;
  } catch (error) {
    return null
  }
}
