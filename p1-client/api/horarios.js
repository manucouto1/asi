import { BASE_PATH_JSON_SERVER, BASE_PATH } from '../utils/constants'
import { authFetch } from "../utils/fetch";

export async function getAllHorarios() {
  try {
    const url = `${BASE_PATH}/horarios`

    const response = await fetch(url, null)
    const result = await response.json()
    return result
  } catch (error) {
    return null
  }
}

export async function getAllEvents() {
  try {
    const url = `${BASE_PATH}/eventos`

    const response = await fetch(url, null)
    const result = await response.json()
    return result
  } catch (error) {
    return null
  }
}

export async function createEvent(
  nombreEvento,
  inicioEvento,
  finEvento,
  descripcionEvento,
  logout
) {
  const url = `${BASE_PATH}/eventos`;
  const body = {
    Nombre: nombreEvento,
    Descripcion: descripcionEvento,
    inicio_evento: inicioEvento,
    fin_evento: finEvento,
  };
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const result = await authFetch(url, params, logout);
  return result;
}
