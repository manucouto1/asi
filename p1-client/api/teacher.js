import { BASE_PATH_JSON_SERVER } from "../utils/constants";

export async function getTeachers() {
  try {
    const url = `${BASE_PATH_JSON_SERVER}/teachers`;
    
    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getTeacher(id) {
  try {
    const url = `${BASE_PATH_JSON_SERVER}/teachers/${id}`;
    
    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}