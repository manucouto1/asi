import { BASE_PATH } from "../utils/constants";

// CREATE IDIOMA
export async function registeridiomas(formData) {
  try {
    const url = `${BASE_PATH}/idiomas`;
    const params = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

// UPDATE IDIOMA
export async function updateLanguage(languageId, formData) {
  try {
    const url = `${BASE_PATH}/idiomas/${languageId}`;
    const params = {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

// GET IDIOMA
export async function getLanguage(languageId) {
  try {
    const url = `${BASE_PATH}/idiomas/${languageId}`;
    const params = {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

// GET IDIOMAS
export async function getLanguages() {
  try {
    const url = `${BASE_PATH}/idiomas`;
    const params = {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

// DELETE IDIOMA
export async function deleteidiomas(languageId) {
  try {
    const url = `${BASE_PATH}/idiomas/${languageId}`;
    const params = {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}