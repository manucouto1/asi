import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { getGroups, getMyGroups, getTeacherGroups } from "../../api/group";
import { createMessage } from "../../api/message";
import { Select } from "semantic-ui-react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const VirtualClassroomCreationForm = () => {
  // States
  const [selectedGroup, setSelectedGroup] = useState();
  const [groups, setGroups] = useState();
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState();

  const { logout } = useAuth();

  useEffect(() => {
    async function fetchMyAPI() {
      const role = sessionStorage.getItem("user_role").toLowerCase();
      const response =
        role === "profesor" ? await getTeacherGroups() : await getMyGroups();
        if (response !== undefined && response !== null) {
          console.log(response)
          setGroups(
            response.map((x) => {
              return { key: x.id, text: x.nombre, value: x.id };
            })
          );
        }
      
    }
    fetchMyAPI();
  }, []);

  async function handleMessageCreation() {
    const teacherId = sessionStorage.getItem("user_id");
    const response = await createMessage(
      selectedGroup,
      teacherId,
      files,
      sessionStorage.getItem("user_name"),
      message,
      () => {
        setSelectedGroup();
        setMessage("");
        setFiles();
      }
    );
  }

  return (
    <Form style={{ padding: "2%" }}>
      <h3>Nuevo mensaje en aula virtual</h3>
      <Select
        fluid
        style={{ width: "25%", marginBottom: "1em" }}
        label="Clase"
        options={groups}
        value={
          selectedGroup !== undefined
            ? selectedGroup.value
            : ""
        }
        placeholder="Clase..."
        onChange={(e, { value }) => {
          setSelectedGroup(value);
        }}
      />
      <Form.TextArea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        label="Mensaje"
        placeholder="Escribe aquí tu nuevo mensaje..."
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <div style={{ textAlign: "right" }}>
        <Button>{"Cancelar"}</Button>
        <Button
          onClick={handleMessageCreation}
          disabled={
            selectedGroup === undefined || message.length === 0
          }
        >
          {"Crear"}
        </Button>
      </div>
    </Form>
  );
};

export default VirtualClassroomCreationForm;
