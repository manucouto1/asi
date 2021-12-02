import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { getGroups } from "../../api/group";
import { updateMessage } from "../../api/message";
import { Select } from "semantic-ui-react";

const VirtualClassroomUpdateForm = ({ messageData, setUpdating }) => {
  // States
  console.log(messageData)
  const [selectedVirtualClassroom, setSelectedVirtualClassroom] = useState(
    messageData.grupo.id
  );
  const [virtualClassrooms, setVirtualClassrooms] = useState();
  const [message, setMessage] = useState(messageData.texto);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getGroups();
      if (response !== undefined && response !== null) {
        setVirtualClassrooms(
          response.map((x) => {
            return { key: x.id, text: x.nombre, value: x.id };
          })
        );
      }
    }
    fetchMyAPI();
  }, []);

  async function handleMessageUpdate() {
    const response = await updateMessage(
      messageData._id,
      selectedVirtualClassroom,
      message,
      () => {
        setSelectedVirtualClassroom();
        setMessage("");
        setFiles();
        setUpdating(false);
      }
    );
  }

  return (
    <Form style={{ padding: "2%" }}>
      <h3>Editar mensaje</h3>
      <Select
        fluid
        style={{ width: "25%", marginBottom: "1em" }}
        label="Clase"
        options={virtualClassrooms}
        value={
          selectedVirtualClassroom !== undefined
            ? selectedVirtualClassroom
            : ""
        }
        placeholder="Clase..."
        onChange={(e, { value }) => {
          setSelectedVirtualClassroom(value);
        }}
      />
      <Form.TextArea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        label="Mensaje"
      />
      <div style={{ textAlign: "right" }}>
        <Button onClick={() => setUpdating(false)}>{"Cancelar"}</Button>
        <Button
          onClick={handleMessageUpdate}
          disabled={
            selectedVirtualClassroom === undefined || message.length === 0
          }
        >
          {"Actualizar"}
        </Button>
      </div>
    </Form>
  );
};

export default VirtualClassroomUpdateForm;
