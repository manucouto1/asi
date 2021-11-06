import { BASE_PATH_JSON_SERVER } from "../utils/constants";

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
    const url = `${BASE_PATH_JSON_SERVER}/virtualClassrooms/${virtualClassroomId}`;

    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}
