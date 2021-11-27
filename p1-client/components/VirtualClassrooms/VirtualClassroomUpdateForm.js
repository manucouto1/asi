import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { getVirtualClassrooms } from "../../api/virtualClassroom";
import { updateMessage } from "../../api/message";
import { Select } from "semantic-ui-react";

const VirtualClassroomUpdateForm = ({ messageData, setUpdating }) => {
  // States
  const [selectedVirtualClassroom, setSelectedVirtualClassroom] = useState(
    messageData.virtual_classroom.id
  );
  const [virtualClassrooms, setVirtualClassrooms] = useState();
  const [message, setMessage] = useState(messageData.texto);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getVirtualClassrooms();
      if (response !== undefined && response !== null) {
        setVirtualClassrooms(
          response.map((x) => {
            return { key: x.id, text: x.grupo.nombre, value: x.id };
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
            ? selectedVirtualClassroom.value
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
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
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
