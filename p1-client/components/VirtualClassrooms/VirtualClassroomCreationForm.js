import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { getVirtualClassrooms } from "../../api/virtualClassroom";
import { createMessage } from "../../api/message";
import { Select } from "semantic-ui-react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const VirtualClassroomCreationForm = () => {
  // States
  const [selectedVirtualClassroom, setSelectedVirtualClassroom] = useState();
  const [virtualClassrooms, setVirtualClassrooms] = useState();
  const [message, setMessage] = useState("");

  const { logout } = useAuth();

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

  async function handleMessageCreation() {
    const teacherId = sessionStorage.getItem("user_id");
    const response = await createMessage(
      selectedVirtualClassroom,
      teacherId,
      sessionStorage.getItem('user_name'),
      message,
      logout
    );
    if (response?._id) {
      setSelectedVirtualClassroom();
      setMessage("");
      toast.success("Mensaje registrado correctamente");
    } else {
      toast.error("Error al registrar el mensaje, inténtelo más tarde");
    }
  }

  return (
    <Form style={{ padding: "2%" }}>
      <h3>Nuevo mensaje en aula virtual</h3>
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
        placeholder="Escribe aquí tu nuevo mensaje..."
      />
      <div style={{ textAlign: "right" }}>
        <Button>{"Cancelar"}</Button>
        <Button
          onClick={handleMessageCreation}
          disabled={
            selectedVirtualClassroom === undefined || message.length === 0
          }
        >
          {"Crear"}
        </Button>
      </div>
    </Form>
  );
};

export default VirtualClassroomCreationForm;
