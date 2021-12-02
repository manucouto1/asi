import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import axios from "axios";
import { toast } from "react-toastify";

export async function getCourses() {
  try {
    const url = `${BASE_PATH}/cursos`;

    const response = await fetch(url, null);
    const result = await response.json();
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function deleteCourse(courseId) {
  const url = `${BASE_PATH}/cursos/${courseId}`;

  return await axios
    .delete(url)
    .then((response) => {
      toast.success("Curso eliminado correctamente");
      return response;
    })
    .catch((error) => {
      toast.error("Error eliminando el curso");
      return error;
    });
}

export async function createCourse(course, logout) {
  try {
    const url = `${BASE_PATH}/cursos`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updateCourse(course, logout) {
  try {
    const url = `${BASE_PATH}/cursos/${course._id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function findCourse(id) {
  try {
    const url = `${BASE_PATH}/cursos/${id}`;
    const response = await fetch(url, null);
    const result = await response.json();
    return result ? result : null;
  } catch (error) {
    return null;
  }
}
