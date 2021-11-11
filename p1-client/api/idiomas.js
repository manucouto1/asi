import { BASE_PATH } from "../utils/constants";

export async function getIdiomas() {
    try {
        const url = `${BASE_PATH}/idiomas`;
        const response = await fetch(url, null);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}