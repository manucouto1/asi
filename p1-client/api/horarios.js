import { BASE_PATH_JSON_SERVER } from "../utils/constants";

export async function getAllHorarios() {
  try {
    const url = `${BASE_PATH_JSON_SERVER}/horarios`;
    
    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getAllEvents() {
    try {
      const url = `${BASE_PATH_JSON_SERVER}/events`;
      
      const response = await fetch(url, null);
      const result = await response.json();
      return result;
    } catch (error) {
      return null;
    }
  }
