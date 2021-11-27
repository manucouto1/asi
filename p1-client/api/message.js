import { BASE_PATH } from "../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";

export async function getVirtualClassroom(virtualClassroomId) {
  try {
    const url = `${BASE_PATH}/virtualClassrooms/${virtualClassroomId}`;

    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getMessages(virtualClassroomId) {
  const url = `${BASE_PATH}/messages?virtual_classroom=${virtualClassroomId}&_sort=createdAt:DESC`;

  const response = await fetch(url, null);
  const result = await response.json();
  return result;
}

export async function createMessage(
  virtualClassroomId,
  teacherId,
  files,
  author,
  message,
  onSuccess
) {
  const url = `${BASE_PATH}/messages`;

  if (files) {
    const formData = new FormData();

    formData.append("files", files[0]);

    await axios
      .post(`${BASE_PATH}/upload`, formData)
      .then((response) => {
        //after success
        const fileId = response.data[0].id;

        const body = {
          texto: message,
          profesor: teacherId,
          autor: author,
          virtual_classroom: virtualClassroomId,
          archivo: fileId,
        };

        axios
          .post(url, body)
          .then((response) => {
            onSuccess();
            toast.success("Mensaje registrado correctamente");
          })
          .catch((error) => {
            toast.error("Error registrando el mensaje");
          });
      })
      .catch((error) => {
        //handle error
      });
  } else {
    const body = {
      texto: message,
      profesor: teacherId,
      autor: author,
      virtual_classroom: virtualClassroomId,
    };

    axios
      .post(url, body)
      .then((response) => {
        onSuccess();
        toast.success("Mensaje registrado correctamente");
      })
      .catch((error) => {
        toast.error("Error registrando el mensaje");
      });
  }
}
