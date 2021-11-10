import React, { useState, useEffect } from "react";
import { getStudents } from "../../api/student";
import { Button } from "semantic-ui-react";

const StudentList = () => {
  const [students, setStudents] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getStudents();
      setStudents(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <div style={{ margin: "10%" }}>
      {students !== undefined &&
        students.map((x) => (
          <p>
            <a href={x.id}>{x.nombre}</a>
            <Button
              class="ui negative basic button"
              style={{ marginLeft: "1em" }}
            >
              Eliminar
            </Button>
          </p>
        ))}
      <div style={{ textAlign: "right" }}>
        <Button class="ui primary button">
          <a href="/students/registro_alumnos">
            <p>Añadir nuevo alumno</p>
          </a>
        </Button>
      </div>
    </div>
  );
};
export default StudentList;
