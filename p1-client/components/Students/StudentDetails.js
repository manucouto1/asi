import React, { useState, useEffect } from "react";
import { getStudent } from "../../api/student";

const StudentDetails = ({ id }) => {
  const [student, setStudent] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      if (id !== undefined) {
        const response = await getStudent(id);
        setStudent(response);
      }
    }
    fetchMyAPI();
  }, [id]);

  return (
    <div style={{ padding: "2%" }}>
      <h3>Página de detalles de un alumno</h3>
      <div>
        <p>Nombre: {student !== undefined && student.nombre}</p>
        <p>Login: {student !== undefined && student.login}</p>
      </div>
    </div>
  );
};

export default StudentDetails;
