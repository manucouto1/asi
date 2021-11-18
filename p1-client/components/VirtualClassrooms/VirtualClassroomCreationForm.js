import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { getGroups } from "../../api/group";
import { sendMessage } from "../../api/virtualClassroom";
import { Select } from 'semantic-ui-react'

const VirtualClassroomCreationForm = () => {
  const [selectedGroup, setSelectedGroup] = useState();
  const [groups, setGroups] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getGroups();
      if (response !== undefined && response !== null) {
        setGroups(
          response.map((x) => {
            return { key: x.id, text: x.nombre, value: x.id };
          })
        );
      }
    }
    fetchMyAPI();
  }, []);

  const handleMessageCreation = () => {
    sendMessage(selectedGroup, message);
  };

  return (
    <Form style={{ padding: "2%" }}>
      <h3>Nuevo mensaje en aula virtual</h3>
      <Select
        fluid
        style={{ width: "25%" }}
        label="Clase"
        options={groups}
        placeholder="Clase..."
        onChange={(e, {value}) => {setSelectedGroup(value)}}
      />
      <Form.TextArea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        label="Mensaje"
        placeholder="Escribe aquí tu nuevo mensaje..."
      />
      <div style={{ textAlign: "right" }}>
        <Button>{"Cancelar"}</Button>
        <Button onClick={handleMessageCreation}>{"Crear"}</Button>
      </div>
    </Form>
  );
};

export default VirtualClassroomCreationForm;
