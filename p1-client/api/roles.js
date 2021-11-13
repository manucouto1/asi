import { BASE_PATH } from "../utils/constants";

export async function getRole(id){
    try {
        const url = `${BASE_PATH}/tipo-rols/${id}`;
        const response = await fetch(url, null);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}