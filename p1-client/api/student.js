import { BASE_PATH_JSON_SERVER } from "../utils/constants";

export async function getStudents() {
  try {
    const url = `${BASE_PATH_JSON_SERVER}/students`;
    
    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getStudent(id) {
  try {
    const url = `${BASE_PATH_JSON_SERVER}/students/${id}`;
    
    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}