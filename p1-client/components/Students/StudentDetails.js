import React, { useState, useEffect } from "react";
import { getStudent } from "../../api/student";
import { Button } from "semantic-ui-react";
import StudentUpdate from "./StudentUpdate";

const StudentDetails = ({ id }) => {
  const [student, setStudent] = useState();
  const [updating, setUpdating] = useState(false);

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
      {!updating && (
        <div>
          <h3>Detalles de un alumno</h3>
          <div>
            <p>
              Nombre:
              {student !== undefined &&
                student !== null &&
                ` ${student.nombre} ${student.apellido1} ${student.apellido2}`}
            </p>
            <p>
              Edad: {student !== undefined && student !== null && student.edad}
            </p>
            <p>
              DNI: {student !== undefined && student !== null && student.dni}
            </p>
            <p>
              Teléfono:{" "}
              {student !== undefined && student !== null && student.telefono}
            </p>
            <p>
              Dirección:
              {student !== undefined && student !== null && student.direccion}
            </p>
            <Button onClick={() => setUpdating(true)}>Editar</Button>
          </div>
        </div>
      )}
      {sessionStorage.getItem("user_role").toLowerCase() === "secretario" &&
        updating &&
        student && (
          <StudentUpdate student={student} setUpdating={setUpdating} />
        )}
    </div>
  );
};

export default StudentDetails;
