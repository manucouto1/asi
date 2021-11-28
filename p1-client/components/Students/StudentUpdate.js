import React, { useState, useEffect } from "react";
import { updateStudent } from "../../api/student";
import { Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";

const StudentUpdate = ({ student, setUpdating }) => {
  const [dni, setDni] = useState(student.dni);
  const [name, setName] = useState(student.nombre);
  const [surname1, setSurname1] = useState(student.apellido1);
  const [surname2, setSurname2] = useState(student.apellido2);
  const [telephone, setTelephone] = useState(student.telefono);
  const [email, setEmail] = useState(student.email);
  const [age, setAge] = useState(student.edad);
  const [address, setAddress] = useState(student.direccion);

  async function handleUpdate() {
    const studentBody = {
      dni,
      nombre: name,
      apellido1: surname1,
      apellido2: surname2,
      telefono: telephone,
      email,
      edad: age,
      direccion: address,
    };
    const response = await updateStudent(student._id, studentBody);
    if (response?._id) {
      toast.success("Alumno actualizado correctamente");
    } else {
      toast.error("Error actualizando al alumno");
    }
  }
  return (
    <div style={{ padding: "2%" }}>
      <h3>Editar alumno</h3>
      <div>
        <Form.Input
          label="DNI: "
          name="dni"
          type="text"
          placeholder="DNI..."
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <Form.Input
          label="Nombre: "
          name="nombre"
          type="text"
          placeholder="Nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Input
          label="Apellido 1: "
          name="apellido1"
          type="text"
          placeholder="Primer apellido..."
          value={surname1}
          onChange={(e) => setSurname1(e.target.value)}
        />
        <Form.Input
          label="Apellido 2: "
          name="apellido2"
          type="text"
          placeholder="Segundo apellido..."
          value={surname2}
          onChange={(e) => setSurname2(e.target.value)}
        />
        <Form.Input
          label="Edad: "
          name="edad"
          type="number"
          placeholder="Edad..."
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Form.Input
          label="Dirección: "
          name="direccion"
          type="text"
          placeholder="Dirección..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Form.Input
          label="Teléfono: "
          name="telefono"
          type="text"
          placeholder="Teléfono..."
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        <Form.Input
          label="Correo electrónico: "
          name="email "
          type="text"
          placeholder="Correo..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "2em" }}>
        <Button onClick={() => setUpdating(false)}>Cancelar</Button>
        <Button onClick={handleUpdate}>Actualizar</Button>
      </div>
    </div>
  );
};

export default StudentUpdate;
