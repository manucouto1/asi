import { BASE_PATH_JSON_SERVER, BASE_PATH } from "../utils/constants";

export async function getVirtualClassrooms() {
  try {
    const url = `${BASE_PATH_JSON_SERVER}/virtualClassrooms`;

    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getVirtualClassroom(virtualClassroomId) {
  try {
    const url = `${BASE_PATH}/virtualClassrooms/${virtualClassroomId}`;

    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function sendMessage(groupId, message) {
  try {
    const url = `${BASE_PATH}/virtualClassrooms/messages`

    const body = {
      groupId,
      message,
    };
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    return null;
  }
}
