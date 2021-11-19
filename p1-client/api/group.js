import { BASE_PATH_JSON_SERVER, BASE_PATH } from "../utils/constants";

export async function getGroup(groupId) {
  try {
    const url = `${BASE_PATH}/groups/${groupId}`;
    
    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getGroups() {
  try {
    const url = `${BASE_PATH}/grupos`;
    
    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}