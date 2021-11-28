import { BASE_PATH_JSON_SERVER, BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function getStudents() {
  try {
    const url = `${BASE_PATH}/alumnos`;

    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getStudent(id) {
  try {
    const url = `${BASE_PATH}/alumnos/${id}`;

    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function createStudent(student, logout) {
  try {
    const url = `${BASE_PATH}/alumnos`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updateStudent(studentId, body, logout) {
  try {
    const url = `${BASE_PATH}/alumnos/${studentId}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    return null;
  }
}
