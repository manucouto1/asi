import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

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

export async function getMessages(virtualClassroomId) {
  const url = `${BASE_PATH}/messages?virtual_classroom=${virtualClassroomId}&_sort=createdAt:DESC`;

  const response = await fetch(url, null);
  const result = await response.json();
  return result;
}

export async function createMessage(
  virtualClassroomId,
  teacherId,
  author,
  message,
  logout
) {
  const url = `${BASE_PATH}/messages`;
  const body = {
    texto: message,
    profesor: teacherId,
    autor: author,
    virtual_classroom: virtualClassroomId,
  };
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const result = await authFetch(url, params, logout);
  return result;
}
