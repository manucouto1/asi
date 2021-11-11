import { BASE_PATH_JSON_SERVER, BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function getCourses() {
  try {
    const url = `${BASE_PATH}/cursos`;
    
    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function createCourse(course, logout) {
  try {
    const url = `${BASE_PATH}/cursos`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course)
    }
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}