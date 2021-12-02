import { BASE_PATH } from "../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";

export async function getGroup(groupId) {
  try {
    const url = `${BASE_PATH}/grupo/${groupId}`;

    const response = await fetch(url, null);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getMessages(groupId) {
  console.log(groupId)
  const url = `${BASE_PATH}/messages?grupo._id=${groupId}&_sort=createdAt:DESC`;

  const response = await fetch(url, null);
  console.log(response)
  const result = await response.json();
  return result;
}

export async function updateMessage(
  messageId,
  selectedVirtualClassroom,
  message
) {
  const url = `${BASE_PATH}/messages/${messageId}`;

  const body = {
    texto: message,
    grupo: selectedVirtualClassroom,
  }

  await axios
    .put(url, body)
    .then((response) => {
      toast.success("Mensaje actualizado correctamente");
    })
    .catch((error) => {
      toast.error("Error actualizando el mensaje");
    });
}

export async function deleteMessage(id) {
  const url = `${BASE_PATH}/messages/${id}`;

  await axios
    .delete(url)
    .then((response) => {
      toast.success("Mensaje eliminado correctamente");
    })
    .catch((error) => {
      toast.error("Error eliminando el mensaje");
    });
}

export async function createMessage(
  groupId,
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
          users_permissions_user: teacherId,
          autor: author,
          grupo: groupId,
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
      users_permissions_user: teacherId,
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
