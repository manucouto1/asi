import React from "react";
import { Form, Button } from "semantic-ui-react";

const options = [{ key: "0", text: "Inglés C1 Grupo 1", value: 0 }];

const VirtualClassroomCreationForm = () => {
  return (
    <Form style={{ padding: "2%" }}>
      <h3>Nuevo mensaje en aula virtual</h3>
      <Form.Select
        fluid
        style={{ width: "25%" }}
        label="Clase"
        options={options}
        placeholder="Clase..."
      />
      <Form.TextArea
        label="Mensaje"
        placeholder="Escribe aquí tu nuevo mensaje..."
      />
      <div style={{ textAlign: "right" }}>
        <Button>{"Cancelar"}</Button>
        <Button type="submit">{"Crear"}</Button>
      </div>
    </Form>
  );
};

export default VirtualClassroomCreationForm;
