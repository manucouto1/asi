import { BASE_PATH } from "../utils/constants";

export async function getVirtualClassrooms() {
  try {
    const url = `${BASE_PATH}/virtual-classrooms`;

    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}
