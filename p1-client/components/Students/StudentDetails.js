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
      <h3>Detalles de un alumno</h3>
      <div>
        <p>
          Nombre:
          {student !== undefined &&
            student !== null &&
            ` ${student.nombre} ${student.apellido1} ${student.apellido2}`}
        </p>
        <p>Edad: {student !== undefined && student !== null && student.edad}</p>
        <p>
          Dirección:
          {student !== undefined && student !== null && student.direccion}
        </p>
      </div>
    </div>
  );
};

export default StudentDetails;
